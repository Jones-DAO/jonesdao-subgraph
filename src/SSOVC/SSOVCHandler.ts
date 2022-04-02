import { SSOVCallDepositsState, SSOVCallPurchasesState } from "../../generated/schema";
import { ArbEthSSOVV2 } from "../../generated/ETHSSOV/ArbEthSSOVV2";
import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { loadOrCreateSSOVCallDepositsStateMetric } from "./SSOVCDepositsState";
import {
  assetToDecimals,
  assetToSSOVC,
  bigIntListToBigDecimalList,
  sumBigDecimalArray
} from "../helpers";
import { loadOrCreateSSOVCallPurchasesStateMetric } from "./SSOVCPurchasesState";
import { toDecimal } from "../utils/Decimals";
import { getEarningsFromDPXFarm } from "../Farms/DPXFarm";
import { DPX_REWARDS_DISTRIBUTION, DPX_SSOVC_V2 } from "../constants";
import { loadSummedJonesSSOVCallPurchaseMetric } from "../JonesVaults/VaultV2Metrics";
import { calculatePurchasedCallPnl, calculateWrittenCallPnl } from "../PnL/PnLCalc";
import { getDPXDecimals, getDPXUSDPrice } from "../utils/DPX";
import { getWETHPrice } from "../utils/WETH";

const ZERO = BigDecimal.fromString("0");

export function updateAndGetSSOVCallDepositsState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  address: string
): SSOVCallDepositsState | null {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const maybeEpoch = ssov.try_currentEpoch();
  if (maybeEpoch.reverted) {
    return null;
  }

  if (!maybeEpoch.value.gt(BigInt.fromString("0"))) {
    return null;
  }

  // we have a valid epoch, but we only wanna calc stuff if the epoch is not expired
  if (ssov.isEpochExpired(maybeEpoch.value)) {
    return null;
  }

  const metric = loadOrCreateSSOVCallDepositsStateMetric(timestamp, dateStr, asset);

  const user = Address.fromString(address);

  const epoch = maybeEpoch.value;
  metric.epoch = epoch;
  metric.user = user.toHexString();
  metric.asset = asset;

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = bigIntListToBigDecimalList(maybeStrikes.value, 8);
  }

  const maybeTotalDeposits = ssov.try_getTotalEpochStrikeDeposits(epoch);
  const maybeUserDeposits = ssov.try_getUserEpochDeposits(epoch, user);

  if (!maybeTotalDeposits.reverted && !maybeUserDeposits.reverted) {
    metric.totalDeposits = bigIntListToBigDecimalList(
      maybeTotalDeposits.value,
      assetToDecimals(asset)
    );
    metric.userDeposits = bigIntListToBigDecimalList(
      maybeUserDeposits.value,
      assetToDecimals(asset)
    );

    let summedTotalDeposits: BigDecimal = BigDecimal.fromString("0");
    let summedUserDeposits: BigDecimal = BigDecimal.fromString("0");
    const newOwnerships: BigDecimal[] = [];
    for (let i = 0; i < metric.totalDeposits.length; i++) {
      const totalDeposit = metric.totalDeposits[i];
      if (totalDeposit.equals(ZERO) || metric.userDeposits[i].equals(ZERO)) {
        newOwnerships.push(BigDecimal.fromString("0"));
      } else {
        newOwnerships.push(metric.userDeposits[i].div(totalDeposit));
      }

      // do the sum stuff
      summedTotalDeposits = summedTotalDeposits.plus(totalDeposit);
      summedUserDeposits = summedUserDeposits.plus(metric.userDeposits[i]);
    }

    metric.ownership = newOwnerships;
    metric.summedTotalDeposits = summedTotalDeposits;
    metric.summedUserDeposits = summedUserDeposits;
    // try to divide and get summed ownership data
    if (!(summedTotalDeposits.equals(ZERO) || summedUserDeposits.equals(ZERO))) {
      // If neither are zero then we set the ownership ratio
      metric.summedOwnership = summedUserDeposits.div(summedTotalDeposits);

      if (asset === "DPX") {
        // Then we look at the farming stuff
        const result = getEarningsFromDPXFarm(DPX_SSOVC_V2);
        const userDPXEarned = result[1].times(metric.summedOwnership);
        metric.totalFarmRewards = result[1];
        metric.userFarmRewards = userDPXEarned;
      }

      if (asset === "ETH") {
        // We look at Dopex team's incentives rewards
        const dpxSsov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC("DPX")));
        const rewardsDistributorDeposits = dpxSsov.getUserEpochDeposits(
          epoch,
          Address.fromString(DPX_REWARDS_DISTRIBUTION)
        );
        const summedRewardsDistributorDeposits = sumBigDecimalArray(
          bigIntListToBigDecimalList(rewardsDistributorDeposits, getDPXDecimals())
        );
        const totalDPXSSOVDeposits = bigIntListToBigDecimalList(
          dpxSsov.getTotalEpochStrikeDeposits(epoch),
          getDPXDecimals()
        );
        const summedTotalDPXSSOVDeposits = sumBigDecimalArray(totalDPXSSOVDeposits);
        const rewardsDistributorTotalOwnership = summedRewardsDistributorDeposits.div(
          summedTotalDPXSSOVDeposits
        );
        const result = getEarningsFromDPXFarm(DPX_SSOVC_V2);
        const totalDPXFarmingFromSSOV = result[0].plus(result[1]); // deposits + rewards (in DPX terms)
        const rewardsAvailableInDPX = rewardsDistributorTotalOwnership.times(
          totalDPXFarmingFromSSOV
        );
        const dpxToEthRatio = getDPXUSDPrice().div(getWETHPrice());
        const rewardsAvailableInETH = rewardsAvailableInDPX.times(dpxToEthRatio);
        metric.summedUserDepositRewards = metric.summedOwnership.times(rewardsAvailableInETH);
      }
    }

    const maybeTotalPremiums = ssov.try_getTotalEpochPremium(epoch);
    if (!maybeTotalPremiums.reverted) {
      metric.totalPremiums = bigIntListToBigDecimalList(
        maybeTotalPremiums.value,
        assetToDecimals(asset)
      );

      const newUserPremiums: BigDecimal[] = [];
      for (let i = 0; i < metric.totalPremiums.length; i++) {
        const totalPremium = metric.totalPremiums[i];
        if (totalPremium.equals(ZERO)) {
          newUserPremiums.push(BigDecimal.fromString("0"));
        } else {
          newUserPremiums.push(totalPremium.times(metric.ownership[i]));
        }
      }

      metric.userPremiums = newUserPremiums;
    }
  }

  const maybeAssetPrice = ssov.try_getUsdPrice();
  if (!maybeAssetPrice.reverted) {
    metric.assetPrice = toDecimal(maybeAssetPrice.value, 8);
  }

  const result = calculateWrittenCallPnl(metric);
  const pnl = result[0];
  metric.pnlUnderlying = pnl;
  if (pnl.notEqual(ZERO) && metric.summedUserDeposits.notEqual(ZERO)) {
    metric.pnlPercentage = pnl.div(metric.summedUserDeposits);
  }

  metric.save();
  return metric;
}

export function updateAndGetSSOVCallPurchasesState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  address: string
): SSOVCallPurchasesState | null {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const maybeEpoch = ssov.try_currentEpoch();
  if (maybeEpoch.reverted) {
    return null;
  }
  if (!maybeEpoch.value.gt(BigInt.fromString("0"))) {
    return null;
  }
  // we have a valid epoch, but we only wanna calc stuff if the epoch is not expired
  if (ssov.isEpochExpired(maybeEpoch.value)) {
    return null;
  }

  const epoch = maybeEpoch.value;
  const metric = loadOrCreateSSOVCallPurchasesStateMetric(timestamp, dateStr, asset);

  const user = Address.fromString(address);

  metric.epoch = epoch;
  metric.user = user.toHexString();
  metric.asset = asset;

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = bigIntListToBigDecimalList(maybeStrikes.value, 8);
  }

  const maybeUserCallPurchases = ssov.try_getUserEpochCallsPurchased(epoch, user);

  if (!maybeUserCallPurchases.reverted) {
    metric.callsPurchased = bigIntListToBigDecimalList(
      maybeUserCallPurchases.value,
      assetToDecimals(asset)
    );
    metric.premiumsPaid = bigIntListToBigDecimalList(
      ssov.getUserEpochPremium(epoch, user),
      assetToDecimals(asset)
    );
  }

  const maybeAssetPrice = ssov.try_getUsdPrice();
  if (!maybeAssetPrice.reverted) {
    metric.assetPrice = toDecimal(maybeAssetPrice.value, 8);
  }

  // lets get the fee breakdown as well
  const maybePurchasesMetric = loadSummedJonesSSOVCallPurchaseMetric(asset, epoch);
  if (maybePurchasesMetric != null) {
    metric.feesPaid = maybePurchasesMetric.feesPaid;
    metric.costToExercise = maybePurchasesMetric.costToExercise;
  }

  metric.totalPremiumsPaid = sumBigDecimalArray(metric.premiumsPaid);
  metric.totalFeesPaid = sumBigDecimalArray(metric.feesPaid);

  metric.pnlUnderlying = calculatePurchasedCallPnl(metric);
  const totalCosts = metric.totalPremiumsPaid.plus(metric.totalFeesPaid);
  if (metric.pnlUnderlying.notEqual(ZERO) && totalCosts.notEqual(ZERO)) {
    metric.pnlPercentage = metric.pnlUnderlying.div(totalCosts);
  }

  metric.save();
  return metric;
}
