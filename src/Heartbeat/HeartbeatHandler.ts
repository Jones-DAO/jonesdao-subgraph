import { getVaultBalanceOf } from "./../helpers";
import { BigDecimal, Address, BigInt, log } from "@graphprotocol/graph-ts";
import { Swap } from "../../generated/JonesETHVaultV1/UniswapV2Pair";
import { SsovV3 } from "../../generated/HeartbeatSwaps/SsovV3";
import { JonesERC20VaultV3 } from "../../generated/HeartbeatSwaps/JonesERC20VaultV3";
import { CALL, PUT, DPX_FARM, MANAGED, UNMANAGED } from "../constants";
import {
  assetToJonesVault,
  assetToJonesCallStrategy,
  assetToJonesPutStrategy,
  assetToJonesHedgingStrategy,
  getVaultSnapshotBalanceOf,
  assetToSSOVC,
  assetToSSOVP,
  tokenAddressToAsset,
  getAssetPriceInOtherAsset,
  getBalanceOf,
  ZERO
} from "../helpers";
import { collectJAssetData } from "../JAsset/JAssetHandler";
import { updateAndGetSSOVDepositsState, updateAndGetSSOVPurchasesState } from "../SSOV/SSOVHandler";
import { timestampToISOHourString } from "../utils/Date";
import { loadOrCreateHeartbeat } from "./HeartbeatMetric";
import { getEarningsFromDopexFarm } from "../helpers";
import { loadOrCreateJonesVaultPnLMetric } from "../PnL/PnlMetric";
import { updateAndGetHedgingStrategyState } from "../Hedging/handler";
const assets: string[] = ["WETH", "DPX", "GOHM", "RDPX"];

export function handleSwap(event: Swap): void {
  const timestamp = event.block.timestamp;

  const blockNumber = event.block.number;

  // The dateStr, as in kinda 2022-01-01T03 is the ID of the heartbeat. If you want to increase precision, make the ID
  // use minutes as well for example: 2022-01-01T03:00/30 etc.
  const dateStr = timestampToISOHourString(timestamp);
  const heartbeat = loadOrCreateHeartbeat(dateStr, timestamp);

  // we've already done stuff for this heartbeat.
  if (timestamp.notEqual(heartbeat.timestamp)) return;

  // Let's gather all data for this heartbeat! -----

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];

    collectJAssetData(dateStr, asset, timestamp);

    const pnlMetric = loadOrCreateJonesVaultPnLMetric(timestamp, dateStr, asset);

    const jonesCallStrategyAddress = assetToJonesCallStrategy(asset);

    const jonesPutStrategyAddress = assetToJonesPutStrategy(asset);

    const jonesHedgingStrategyAddress = assetToJonesHedgingStrategy(asset);

    const jonesVault = JonesERC20VaultV3.bind(Address.fromString(assetToJonesVault(asset)));

    // A value of 1 corresonds with an `UNMANAGED` state, meaning the epoch has ended and the
    // vault is open for deposits and withdrawals - see the `State` enum in IVault.sol
    if (jonesVault.state() === 1) {
      pnlMetric.pnlUnderlying = BigDecimal.fromString("0");
      pnlMetric.pnlPercentage = BigDecimal.fromString("0");
      pnlMetric.vaultState = UNMANAGED;

      pnlMetric.save();
      break;
    }

    pnlMetric.vaultState = MANAGED;

    // const jonesHedgingStrategyAddress = assetToJonesHedgingStrategy(asset);

    const ssovcDepositsState = updateAndGetSSOVDepositsState(
      timestamp,
      dateStr,
      asset,
      CALL,
      jonesCallStrategyAddress
    );

    const ssovcPurchasesState = updateAndGetSSOVPurchasesState(
      timestamp,
      dateStr,
      asset,
      CALL,
      jonesCallStrategyAddress
    );

    const ssovpDepositsState = updateAndGetSSOVDepositsState(
      timestamp,
      dateStr,
      asset,
      PUT,
      jonesPutStrategyAddress
    );

    const ssovpPurchasesState = updateAndGetSSOVPurchasesState(
      timestamp,
      dateStr,
      asset,
      PUT,
      jonesPutStrategyAddress
    );

    const hedgingStrategyState = updateAndGetHedgingStrategyState(
      timestamp,
      dateStr,
      asset,
      jonesHedgingStrategyAddress,
      blockNumber
    );

    // If there is no ssovcDepositsState at this heartbeat, we dont do anything.
    if (ssovcDepositsState == null) {
      return;
    }

    if (ssovcDepositsState) {
      pnlMetric.epoch = ssovcDepositsState.epoch;
      pnlMetric.assetPrice = ssovcDepositsState.assetPrice;
    }

    const initialVaultBalance = getVaultSnapshotBalanceOf(asset);
    pnlMetric.epochStartingAssets = initialVaultBalance;

    pnlMetric.unallocatedAssetValue = getValueOfAssetsWithBalance(
      asset,
      pnlMetric.epoch,
      jonesCallStrategyAddress,
      jonesPutStrategyAddress
    );

    let ssovcDepositPnl = BigDecimal.fromString("0");
    let ssovcPurchasePnl = BigDecimal.fromString("0");
    let ssovcDepositedValue = BigDecimal.fromString("0");
    if (ssovcDepositsState) {
      ssovcDepositPnl = ssovcDepositsState.pnlUnderlying;
      ssovcDepositedValue = ssovcDepositsState.totalDepositedValue;
    }
    if (ssovcPurchasesState && ssovcPurchasesState.pnlUnderlying.gt(ZERO)) {
      ssovcPurchasePnl = ssovcPurchasesState.pnlUnderlying;
    }
    pnlMetric.SSOVCDepositPnl = ssovcDepositPnl;
    pnlMetric.SSOVCPurchasePnl = ssovcPurchasePnl;

    let ssovpDepositPnl = BigDecimal.fromString("0");
    let ssovpPurchasePnl = BigDecimal.fromString("0");
    let ssovpDepositedValue = BigDecimal.fromString("0");
    if (ssovpDepositsState) {
      ssovpDepositPnl = ssovpDepositsState.pnlUnderlying;
      ssovpDepositedValue = ssovpDepositsState.totalDepositedValue;
    }
    if (ssovpPurchasesState && ssovpPurchasesState.pnlUnderlying.gt(ZERO)) {
      ssovpPurchasePnl = ssovpPurchasesState.pnlUnderlying;
    }
    pnlMetric.SSOVPDepositPnl = ssovpDepositPnl;
    pnlMetric.SSOVPPurchasePnl = ssovpPurchasePnl;

    let farmingDeposits = BigDecimal.fromString("0");
    let farmingPnl = BigDecimal.fromString("0");
    if (asset === "DPX") {
      const result = getEarningsFromDopexFarm(assetToJonesVault("DPX"), DPX_FARM, "DPX");
      farmingDeposits = result[0];
      farmingPnl = result[1];
    }

    pnlMetric.farmPnl = farmingPnl;
    pnlMetric.totalAssetsFarming = farmingDeposits;

    let hedgingValue = BigDecimal.fromString("0");
    if (hedgingStrategyState) {
      hedgingValue = hedgingStrategyState.totalUnderlyingValue;
    }

    const currentAssetsIncludingPnl = pnlMetric.unallocatedAssetValue
      .plus(farmingDeposits)
      .plus(farmingPnl)
      .plus(ssovcDepositPnl)
      .plus(ssovcDepositedValue)
      .plus(ssovcPurchasePnl)
      .plus(ssovpDepositPnl)
      .plus(ssovpPurchasePnl)
      .plus(ssovpDepositedValue)
      .plus(hedgingValue);

    pnlMetric.currentAssetsWithPnl = currentAssetsIncludingPnl;

    pnlMetric.pnlUnderlying = currentAssetsIncludingPnl.minus(initialVaultBalance);

    if (pnlMetric.pnlUnderlying.notEqual(ZERO)) {
      pnlMetric.pnlPercentage = pnlMetric.pnlUnderlying
        .div(initialVaultBalance)
        .times(BigDecimal.fromString("100"));
    }

    pnlMetric.save();
  }
}

// Sum the value of the assets the vault and strategies for a particular `asset`
// may hold, denominated in `asset`
const getValueOfAssetsWithBalance = (
  asset: string,
  epoch: BigInt,
  callStrategyAddress: string,
  putStrategyAddress: string
): BigDecimal => {
  let rewardValue = getVaultBalanceOf(asset);

  rewardValue = rewardValue.plus(getBalanceOf(asset, callStrategyAddress));

  const ssovc = SsovV3.bind(Address.fromString(assetToSSOVC(asset)));
  const ssovcEpochDataResult = ssovc.getEpochData(epoch);
  const ssovcRewardTokens = ssovcEpochDataResult.rewardTokensToDistribute;

  for (let i = 0; i < ssovcRewardTokens.length; i++) {
    const rewardAsset = tokenAddressToAsset(ssovcRewardTokens[i].toHex());

    if (rewardAsset !== asset) {
      const rewardAssetPriceInAsset = getAssetPriceInOtherAsset(rewardAsset, asset);
      const rewardAssetAmount = getBalanceOf(rewardAsset, callStrategyAddress);

      const rewardAssetValueInAsset = rewardAssetAmount.times(rewardAssetPriceInAsset);

      rewardValue = rewardValue.plus(rewardAssetValueInAsset);
    }
  }

  rewardValue = rewardValue.plus(getBalanceOf(asset, putStrategyAddress));

  const ssovp = SsovV3.bind(Address.fromString(assetToSSOVP(asset)));
  const ssovpEpochDataResult = ssovp.getEpochData(epoch);
  const ssovpRewardTokens = ssovpEpochDataResult.rewardTokensToDistribute;

  for (let i = 0; i < ssovpRewardTokens.length; i++) {
    const rewardAsset = tokenAddressToAsset(ssovpRewardTokens[i].toHex());

    if (rewardAsset !== asset) {
      const rewardAssetPriceInAsset = getAssetPriceInOtherAsset(rewardAsset, asset);
      const rewardAssetAmount = getBalanceOf(rewardAsset, putStrategyAddress);

      const rewardAssetValueInAsset = rewardAssetAmount.times(rewardAssetPriceInAsset);

      rewardValue = rewardValue.plus(rewardAssetValueInAsset);
    }
  }

  let putStrategyUsdcValue = BigDecimal.fromString("0");
  const putStrategyUsdcBalance = getBalanceOf("USDC", putStrategyAddress);

  if (putStrategyUsdcBalance.notEqual(ZERO)) {
    putStrategyUsdcValue = putStrategyUsdcBalance.times(getAssetPriceInOtherAsset("USDC", asset));
  }

  let putStrategy2CrvValue = BigDecimal.fromString("0");
  const putStrategy2CrvBalance = getBalanceOf("2CRV", putStrategyAddress);

  if (putStrategy2CrvBalance.notEqual(ZERO)) {
    putStrategy2CrvValue = putStrategy2CrvBalance.times(getAssetPriceInOtherAsset("2CRV", asset));
  }

  return rewardValue.plus(putStrategyUsdcValue).plus(putStrategy2CrvValue);
};
