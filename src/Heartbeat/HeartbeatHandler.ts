import { getVaultBalanceOf } from "./../helpers";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Swap } from "../../generated/JonesETHVaultV1/UniswapV2Pair";
import { ASSET_MGMT_MULTISIG } from "../constants";
import { assetToJonesVaultV2, getVaultSnapshotBalanceOf, shouldReadAsset } from "../helpers";
import { collectJAssetData } from "../JAsset/JAssetHandler";
import { updateAndGetSSOVDepositsState, updateAndGetSSOVPurchasesState } from "../SSOV/SSOVHandler";
import { timestampToISODateString, timestampToISOHourString } from "../utils/Date";
import { loadOrCreateHeartbeat } from "./HeartbeatMetric";
import { calculatePurchasedCallPnl, calculateWrittenCallPnl } from "../PnL/PnLCalc";
import { getEarningsFromDPXFarm } from "../Farms/DPXFarm";
import { loadOrCreateJonesVaultPnLMetric } from "../PnL/PnlMetric";

const assets: string[] = ["ETH", "DPX", "GOHM"];
const lastBlockOfJonesAsstMgmtMultisig = "7209882";

export function handleSwap(event: Swap): void {
  // Just do something
  const timestamp = event.block.timestamp;
  const dateStr = timestampToISODateString(timestamp);
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

      const depositState = updateAndGetSSOVDepositsState(timestamp, dateStr, asset, userAddr);
      const purchaseState = updateAndGetSSOVPurchasesState(timestamp, dateStr, asset, userAddr);

      // For each asset, let's do the following:
      /**
       * 1. Get initial balance
       * 2. Get current (unallocated) balance
       * 3. Get PnL from SSOV Deposits as of right now (in underlying terms)
       * 4. Get PnL from SSOV Call purchases as of right now (in underlying terms)
       * 5. If asset is DPX, read earnings from Farm as well
       * 6. Add a hard-coded rewards param (init to 0 for now)
       * 7. Sum the above (2-6) and save a metric with all the intermittent calculations as well.
       * 8. Get PnL by comparing 1 to 7. Save.
       */

      const pnlMetric = loadOrCreateJonesVaultPnLMetric(timestamp, asset);
      if (depositState) {
        pnlMetric.epoch = depositState.epoch;
      }

      // 1
      const initBalance = getVaultSnapshotBalanceOf(asset);
      pnlMetric.epochStartingAssets = initBalance;

      // 2
      const unallocatedBalance = getVaultBalanceOf(asset);
      pnlMetric.unallocatedAssets = unallocatedBalance;

      // 3
      let depositPnl = BigDecimal.fromString("0");
      let totalDeposited = BigDecimal.fromString("0");
      if (depositState) {
        const depositCalcs = calculateWrittenCallPnl(depositState);
        depositPnl = depositCalcs[0];
        totalDeposited = depositCalcs[1];
      }
      const depositValue = totalDeposited.plus(depositPnl);
      pnlMetric.depositPnl = depositPnl;
      pnlMetric.totalAssetsDeposited = totalDeposited;

      // 4
      const purchasesPnl =
        purchaseState == null
          ? BigDecimal.fromString("0")
          : calculatePurchasedCallPnl(purchaseState);

      pnlMetric.purchasePnl = purchasesPnl;

      // 5
      let farmingDeposits = BigDecimal.fromString("0");
      let farmingPnl = BigDecimal.fromString("0");
      if (asset === "DPX") {
        const result = getEarningsFromDPXFarm(assetToJonesVaultV2("DPX"));
        farmingDeposits = result[0];
        farmingPnl = result[1];
      }

      pnlMetric.farmPnl = farmingPnl;
      pnlMetric.totalAssetsFarming = farmingDeposits;

      // 6
      // TODO (maybe do it in the frontend?)

      // 7
      const currentAssetsIncludingPnl = unallocatedBalance
        .plus(farmingDeposits)
        .plus(depositValue)
        .plus(farmingPnl);

      pnlMetric.currentAssetsWithPnl = currentAssetsIncludingPnl;

      // 8
      const pnlInAssets = currentAssetsIncludingPnl.minus(initBalance);
      const pnlInPercentage = pnlInAssets.div(initBalance);

      pnlMetric.pnlUnderlying = pnlInAssets;
      pnlMetric.pnlPercentage = pnlInPercentage;

      pnlMetric.save();
    }
  }
}
