import { SSOVDepositsState, SSOVPurchasesState } from "../../generated/schema";
import { SsovV3 } from "../../generated/HeartbeatSwaps/SsovV3";
import { SsovV3Viewer } from "../../generated/HeartbeatSwaps/SsovV3Viewer";
import { SsovV3OptionsToken } from "../../generated/HeartbeatSwaps/SsovV3OptionsToken";
import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { loadOrCreateSSOVDepositsStateMetric } from "./SSOVDepositsState";
import {
  assetToDecimals,
  assetToSSOVC,
  assetToSSOVP,
  tokenAddressToAsset,
  tokenAddressToSSOVC,
  tokenAddressToSSOVP,
  isCall,
  ZERO
} from "../helpers";
import { loadOrCreateSSOVPurchasesStateMetric } from "./SSOVPurchasesState";
import { loadSummedJonesSSOVPurchaseMetric } from "../Purchases/metrics";
import { toDecimal } from "../utils/Decimals";
import { SSOV_VIEWER } from "../constants";

export function updateAndGetSSOVDepositsState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  optionType: string,
  jonesStrategyAddress: string
): SSOVDepositsState | null {
  const ssovAddress = Address.fromString(
    isCall(optionType) ? assetToSSOVC(asset) : assetToSSOVP(asset)
  );
  const ssov = SsovV3.bind(ssovAddress);
  const ssovViewer = SsovV3Viewer.bind(Address.fromString(SSOV_VIEWER));
  const epoch = ssov.currentEpoch();

  const epochDataResult = ssov.getEpochData(epoch);
  const rewardTokensToDistribute = epochDataResult.rewardTokensToDistribute;

  const metric = loadOrCreateSSOVDepositsStateMetric(timestamp, dateStr, asset, optionType);

  metric.epoch = epoch;
  metric.strategy = jonesStrategyAddress;
  metric.asset = asset;

  const strategy = Address.fromString(jonesStrategyAddress);

  const collateralTokenPrice = toDecimal(ssov.getCollateralPrice(), 8);

  const depositTokenIds = ssovViewer.walletOfOwner(strategy, ssovAddress);

  let totalDepositedCollateralAmount: BigDecimal = BigDecimal.fromString("0");
  let totalPnl: BigDecimal = BigDecimal.fromString("0");

  for (let i = 0; i < depositTokenIds.length; i++) {
    const tokenId = depositTokenIds[i];

    const writePositionResult = ssov.writePosition(tokenId);
    // Apparently The Graph's type generation does not always preserve struct property names
    const depositedCollateralAmount = writePositionResult.value2;

    totalDepositedCollateralAmount = totalDepositedCollateralAmount.plus(
      toDecimal(depositedCollateralAmount, assetToDecimals(asset))
    );

    const getWritePositionValueResult = ssovViewer.getWritePositionValue(tokenId, ssovAddress);
    const currentCollateralAmount = getWritePositionValueResult.value0;
    const rewardAmounts = getWritePositionValueResult.value1;

    let totalRewardValueInCollateralAsset: BigDecimal = BigDecimal.fromString("0");

    // Sum the value, in USD, of all earned rewards
    for (let j = 0; j < rewardTokensToDistribute.length; j++) {
      const rewardToken = rewardTokensToDistribute[j];
      const rewardAmount = rewardAmounts[j];

      // SSOV-P is used here in all cases because, in the case of puts, the reward
      // token may be CRV - which doesn't have an SSOV-C at the time of writing.
      const rewardTokenSsovAddress = tokenAddressToSSOVP(rewardToken.toHexString());

      const rewardTokenSsov = SsovV3.bind(Address.fromString(rewardTokenSsovAddress));
      const rewardTokenPrice = rewardTokenSsov.getUnderlyingPrice();

      const rewardAsset = tokenAddressToAsset(rewardToken.toHex());
      const rewardValueInUsd = toDecimal(rewardAmount, assetToDecimals(rewardAsset)).times(
        toDecimal(rewardTokenPrice, 8)
      );
      const rewardValueInCollateralAsset = rewardValueInUsd.div(collateralTokenPrice);

      totalRewardValueInCollateralAsset = totalRewardValueInCollateralAsset.plus(
        rewardValueInCollateralAsset
      );
    }

    const collateralPnl = toDecimal(
      currentCollateralAmount.minus(depositedCollateralAmount),
      assetToDecimals(asset)
    );
    const pnlForDeposit = collateralPnl.plus(totalRewardValueInCollateralAsset);

    totalPnl = totalPnl.plus(pnlForDeposit);
  }

  metric.assetPrice = toDecimal(ssov.getUnderlyingPrice(), 8);

  metric.totalDepositedValue = isCall(optionType)
    ? totalDepositedCollateralAmount
    : totalDepositedCollateralAmount.times(collateralTokenPrice).div(metric.assetPrice);

  // totalPnl is denominated in the collateral asset - for call SSOVs,
  // this is the same as the underlying asset.
  metric.pnlUnderlying = isCall(optionType)
    ? totalPnl
    : totalPnl.times(collateralTokenPrice).div(metric.assetPrice);

  if (totalPnl.notEqual(ZERO)) {
    metric.pnlPercentage = totalPnl
      .div(totalDepositedCollateralAmount)
      .times(BigDecimal.fromString("100"));
  }

  metric.save();
  return metric;
}

export function updateAndGetSSOVPurchasesState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  optionType: string,
  jonesStrategyAddress: string
): SSOVPurchasesState | null {
  const ssovAddress = Address.fromString(
    isCall(optionType) ? assetToSSOVC(asset) : assetToSSOVP(asset)
  );
  const ssov = SsovV3.bind(ssovAddress);
  const ssovViewer = SsovV3Viewer.bind(Address.fromString(SSOV_VIEWER));
  const epoch = ssov.currentEpoch();

  const epochDataResult = ssov.getEpochData(epoch);
  const expired = epochDataResult.expired;

  const collateralTokenPrice = toDecimal(ssov.getCollateralPrice(), 8);
  const underlyingTokenPrice = toDecimal(ssov.getUnderlyingPrice(), 8);

  // we only wanna calc stuff if the epoch is not expired
  if (expired) return null;

  const metric = loadOrCreateSSOVPurchasesStateMetric(timestamp, dateStr, asset, optionType);

  const strategy = Address.fromString(jonesStrategyAddress);

  metric.epoch = epoch;
  metric.strategy = strategy.toHexString();
  metric.asset = asset;

  const strikePrices = ssov.getEpochStrikes(epoch);
  const strikeTokenAddresses = ssovViewer.getEpochStrikeTokens(epoch, ssovAddress);

  let totalPnl: BigInt = BigInt.fromString("0");

  for (let i = 0; i < strikeTokenAddresses.length; i++) {
    const strikeToken = SsovV3OptionsToken.bind(strikeTokenAddresses[i]);

    const amount = strikeToken.balanceOf(strategy);
    const strikePrice = strikePrices[i];
    const currentUnderlyingPrice = ssov.getUnderlyingPrice();

    const value = ssov.calculatePnl(currentUnderlyingPrice, strikePrice, amount);

    totalPnl = totalPnl.plus(value);
  }

  const purchaseMetric = loadSummedJonesSSOVPurchaseMetric(asset, optionType, epoch);

  if (!purchaseMetric) return null;

  const settlementFees = ssov.calculateSettlementFees(totalPnl);

  const totalCosts = purchaseMetric.totalPremiumsPaid
    .plus(purchaseMetric.totalFeesPaid)
    .plus(toDecimal(settlementFees, 18));

  const pnlInCollateralAsset = toDecimal(totalPnl, 18).minus(totalCosts);

  // For calls, the collateral asset and underlying asset are the same
  metric.pnlUnderlying = isCall(optionType)
    ? pnlInCollateralAsset
    : pnlInCollateralAsset.times(collateralTokenPrice).div(underlyingTokenPrice);

  if (metric.pnlUnderlying.notEqual(ZERO) && totalCosts.notEqual(ZERO)) {
    metric.pnlPercentage = metric.pnlUnderlying.div(totalCosts).times(BigDecimal.fromString("100"));
  }

  metric.save();
  return metric;
}
