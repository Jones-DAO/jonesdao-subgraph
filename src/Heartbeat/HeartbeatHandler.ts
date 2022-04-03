import { getVaultBalanceOf } from "./../helpers";
import { BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { Swap } from "../../generated/JonesETHVaultV1/UniswapV2Pair";
import { ASSET_MGMT_MULTISIG } from "../constants";
import { assetToJonesVaultV2, getVaultSnapshotBalanceOf, shouldReadAsset } from "../helpers";
import { collectJAssetData } from "../JAsset/JAssetHandler";
import {
  updateAndGetSSOVCallDepositsState,
  updateAndGetSSOVCallPurchasesState
} from "../SSOVC/SSOVCHandler";
import { timestampToISOHourString } from "../utils/Date";
import { loadOrCreateHeartbeat } from "./HeartbeatMetric";
import { getEarningsFromDPXFarm } from "../Farms/DPXFarm";
import { loadOrCreateJonesVaultPnLMetric } from "../PnL/PnlMetric";
import {
  updateAndGetSSOVPutDepositsState,
  updateAndGetSSOVPutPurchasesState
} from "../SSOVP/SSOVPHandler";

const assets: string[] = ["ETH", "DPX", "GOHM"];
const lastBlockOfJonesAsstMgmtMultisig = "7209882";

export function handleSwap(event: Swap): void {
  // Just do something
  const timestamp = event.block.timestamp;

  // The dateStr, as in kinda 2022-01-01T03 is the ID of the heartbeat. If you want to increase precision, make the ID
  // use minutes as well for example: 2022-01-01T03:00/30 etc.
  const dateStr = timestampToISOHourString(timestamp);
  const heartbeat = loadOrCreateHeartbeat(dateStr, timestamp);

  // we've already done stuff for this heartbeat.
  if (timestamp.notEqual(heartbeat.timestamp)) return;

  // Let's gather all data for this heartbeat! -----

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];

    if (shouldReadAsset(asset, event.block.number)) {
      collectJAssetData(dateStr, asset, timestamp);

      // Depending on the block nr we either get the old asset mgmt wallet addr or the new vault addr (which in turn is dependent on the asset at hand)
      const userAddr = event.block.number.le(BigInt.fromString(lastBlockOfJonesAsstMgmtMultisig))
        ? ASSET_MGMT_MULTISIG
        : assetToJonesVaultV2(asset);

      const ssovcDepositState = updateAndGetSSOVCallDepositsState(
        timestamp,
        dateStr,
        asset,
        userAddr
      );
      const ssovcPurchaseState = updateAndGetSSOVCallPurchasesState(
        timestamp,
        dateStr,
        asset,
        userAddr
      );

      const ssovpDepositsState = updateAndGetSSOVPutDepositsState(
        timestamp,
        dateStr,
        asset,
        userAddr
      );
      const ssovpPurchasesState = updateAndGetSSOVPutPurchasesState(
        timestamp,
        dateStr,
        asset,
        userAddr
      );

      // If there is no ssovcDepositState at this heartbeat, we dont do anything.
      if (ssovcDepositState == null) {
        return;
      }

      // For each asset, let's do the following:
      /**
       * 1. Get initial balance
       * 2. Get current (unallocated) balance
       * 3. Get PnL from SSOV Deposits as of right now (in underlying terms)
       * 4. Get PnL from SSOV Call purchases as of right now (in underlying terms)
       * 5. Get position value (not pnl) from both the put deposits and purchases
       * 6. If asset is DPX, read earnings from Farm as well
       * 7. Add a hard-coded rewards param (init to 0 for now)
       * 8. Sum the above and save a metric with all the intermittent calculations as well.
       * 9. Get PnL by comparing. Save
       */

      const pnlMetric = loadOrCreateJonesVaultPnLMetric(timestamp, dateStr, asset);
      if (ssovcDepositState) {
        pnlMetric.epoch = ssovcDepositState.epoch;
        pnlMetric.assetPrice = ssovcDepositState.assetPrice;
      }

      // 1
      const initBalance = getVaultSnapshotBalanceOf(asset);
      pnlMetric.epochStartingAssets = initBalance;

      // 2
      const unallocatedBalance = getVaultBalanceOf(asset);
      pnlMetric.unallocatedAssets = unallocatedBalance;

      // 3
      let ssovcDepositPnl = BigDecimal.fromString("0");
      let ssovcTotalDeposited = BigDecimal.fromString("0");
      if (ssovcDepositState) {
        ssovcDepositPnl = ssovcDepositState.pnlUnderlying;
        ssovcTotalDeposited = ssovcDepositState.summedUserDeposits;
      }
      const ssovcDepositValue = ssovcTotalDeposited.plus(ssovcDepositPnl);
      pnlMetric.SSOVCDepositPnl = ssovcDepositPnl;
      pnlMetric.totalSSOVCAssetsDeposited = ssovcTotalDeposited;

      // 4
      let ssovcPurchasePnl = BigDecimal.fromString("0");
      if (ssovcPurchaseState) {
        ssovcPurchasePnl = ssovcPurchaseState.pnlUnderlying;
      }
      pnlMetric.SSOVCPurchasePnl = ssovcPurchasePnl;

      // 5
      let ssovpDepositsValue = BigDecimal.fromString("0");
      let ssovpPurchasesValue = BigDecimal.fromString("0");
      if (ssovpDepositsState) {
        ssovpDepositsValue = ssovpDepositsState.positionsValueInUnderlying;
      }
      if (ssovpPurchasesState) {
        ssovpPurchasesValue = ssovpPurchasesState.positionsValueInUnderlying;
      }
      pnlMetric.SSOVPDepositsValue = ssovpDepositsValue;
      pnlMetric.SSOVPPurchasesValue = ssovpPurchasesValue;

      // 6
      let farmingDeposits = BigDecimal.fromString("0");
      let farmingPnl = BigDecimal.fromString("0");
      if (asset === "DPX") {
        const result = getEarningsFromDPXFarm(assetToJonesVaultV2("DPX"));
        farmingDeposits = result[0];
        farmingPnl = result[1];
      }

      pnlMetric.farmPnl = farmingPnl;
      pnlMetric.totalAssetsFarming = farmingDeposits;

      // 7
      // Is baked into the ssovcDepositValue

      // 8
      const currentAssetsIncludingPnl = unallocatedBalance
        .plus(farmingDeposits)
        .plus(ssovcDepositValue)
        .plus(farmingPnl)
        .plus(ssovpPurchasesValue)
        .plus(ssovpDepositsValue);

      pnlMetric.currentAssetsWithPnl = currentAssetsIncludingPnl;

      // 9
      const pnlInAssets = currentAssetsIncludingPnl.minus(initBalance);
      const pnlInPercentage = pnlInAssets.div(initBalance);

      pnlMetric.pnlUnderlying = pnlInAssets;
      pnlMetric.pnlPercentage = pnlInPercentage;

      pnlMetric.save();
    }
  }
}
