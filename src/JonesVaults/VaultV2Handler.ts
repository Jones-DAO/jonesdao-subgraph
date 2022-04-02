import { ArbEthSSOVV2 } from "./../../generated/JonesETHVaultV2/ArbEthSSOVV2";
import { Curve2PoolSsovPut } from "./../../generated/JonesETHVaultV2/Curve2PoolSsovPut";

import {
  assetToDecimals,
  assetToSSOVC,
  assetToSSOVP,
  plusBigDecimalAtIndex,
  sumBigDecimalArray
} from "./../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";

import { toDecimal } from "../utils/Decimals";
import {
  loadOrCreateJonesEpochStartedMetric,
  loadOrCreateJonesSSOVCallDepositMetric,
  loadOrCreateJonesSSOVCallPurchaseMetric,
  loadOrCreateJonesSSOVPutDepositMetric,
  loadOrCreateJonesSSOVPutPurchaseMetric,
  loadOrCreateSummedJonesSSOVCallPurchaseMetric,
  loadOrCreateSummedJonesSSOVPutPurchaseMetric
} from "./VaultV2Metrics";
import {
  JonesEpochStarted,
  JonesSSOVCallDeposit,
  JonesSSOVCallPurchase,
  JonesSSOVPutDeposit,
  JonesSSOVPutPurchase
} from "../../generated/schema";
import { DOPEX_EXERCISE_FEE } from "../constants";
import { get2CRVDecimals } from "../utils/2CRV";

export function handleSSOVCallDeposit(
  timestamp: BigInt,
  strikeIndex: BigInt,
  epoch: BigInt,
  amount: BigInt,
  asset: string
): JonesSSOVCallDeposit {
  const metric = loadOrCreateJonesSSOVCallDepositMetric(timestamp, asset, strikeIndex);
  metric.epoch = epoch.plus(BigInt.fromString("1"));
  metric.strikeIndex = strikeIndex;
  metric.amount = toDecimal(amount, assetToDecimals(asset));
  metric.save();

  return metric;
}

export function handleSSOVCallPurchase(
  timestamp: BigInt,
  strikeIndex: BigInt,
  epoch: BigInt,
  amount: BigInt,
  premium: BigInt,
  totalFee: BigInt,
  asset: string
): JonesSSOVCallPurchase {
  const metric = loadOrCreateJonesSSOVCallPurchaseMetric(timestamp, asset, strikeIndex);

  const assetDecimals = assetToDecimals(asset);

  metric.epoch = epoch;
  metric.strikeIndex = strikeIndex;
  metric.amount = toDecimal(amount, assetDecimals);
  metric.premium = toDecimal(premium, assetDecimals);
  metric.totalFee = toDecimal(totalFee, assetDecimals);
  metric.save();

  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const strikes = ssov.getEpochStrikes(metric.epoch);

  // We also want to maintain a metric showing the sum of all this epoch's purchases (per asset)
  const sumMetric = loadOrCreateSummedJonesSSOVCallPurchaseMetric(asset, metric.epoch, strikes);
  const i = metric.strikeIndex.toI32();
  sumMetric.callsPurchased = plusBigDecimalAtIndex(
    sumMetric.callsPurchased,
    i,
    sumMetric.callsPurchased[i].plus(metric.amount)
  );
  sumMetric.premiumsPaid = plusBigDecimalAtIndex(
    sumMetric.premiumsPaid,
    i,
    sumMetric.premiumsPaid[i].plus(metric.premium)
  );
  sumMetric.feesPaid = plusBigDecimalAtIndex(
    sumMetric.feesPaid,
    i,
    sumMetric.feesPaid[i].plus(metric.totalFee)
  );
  sumMetric.costToExercise = plusBigDecimalAtIndex(
    sumMetric.costToExercise,
    i,
    sumMetric.costToExercise[i].plus(metric.amount.times(DOPEX_EXERCISE_FEE))
  );

  sumMetric.totalPremiumsPaid = sumBigDecimalArray(sumMetric.premiumsPaid);
  sumMetric.totalFeesPaid = sumBigDecimalArray(sumMetric.feesPaid);
  sumMetric.totalCostToExercise = sumBigDecimalArray(sumMetric.costToExercise);
  sumMetric.save();

  return metric;
}

export function handleSSOVPutDeposit(
  timestamp: BigInt,
  strikeIndex: BigInt,
  epoch: BigInt,
  amount: BigInt,
  asset: string
): JonesSSOVPutDeposit {
  const metric = loadOrCreateJonesSSOVPutDepositMetric(timestamp, asset, strikeIndex);
  metric.epoch = epoch.plus(BigInt.fromString("1"));
  metric.strikeIndex = strikeIndex;
  metric.amount = toDecimal(amount, get2CRVDecimals());
  metric.save();

  return metric;
}

export function handleSSOVPutPurchase(
  timestamp: BigInt,
  strikeIndex: BigInt,
  epoch: BigInt,
  amount: BigInt,
  premium: BigInt,
  totalFee: BigInt,
  asset: string
): JonesSSOVPutPurchase {
  const metric = loadOrCreateJonesSSOVPutPurchaseMetric(timestamp, asset, strikeIndex);

  const assetDecimals = get2CRVDecimals();

  metric.epoch = epoch;
  metric.strikeIndex = strikeIndex;
  metric.amount = toDecimal(amount, assetDecimals);
  metric.premium = toDecimal(premium, assetDecimals);
  metric.totalFee = toDecimal(totalFee, assetDecimals);
  metric.save();

  const ssov = Curve2PoolSsovPut.bind(Address.fromString(assetToSSOVC(asset)));
  const strikes = ssov.getEpochStrikes(metric.epoch);

  // We also want to maintain a metric showing the sum of all this epoch's purchases (per asset)
  const sumMetric = loadOrCreateSummedJonesSSOVPutPurchaseMetric(asset, metric.epoch, strikes);
  const i = metric.strikeIndex.toI32();
  sumMetric.putsPurchased = plusBigDecimalAtIndex(
    sumMetric.putsPurchased,
    i,
    sumMetric.putsPurchased[i].plus(metric.amount)
  );
  sumMetric.premiumsPaid = plusBigDecimalAtIndex(
    sumMetric.premiumsPaid,
    i,
    sumMetric.premiumsPaid[i].plus(metric.premium)
  );
  sumMetric.feesPaid = plusBigDecimalAtIndex(
    sumMetric.feesPaid,
    i,
    sumMetric.feesPaid[i].plus(metric.totalFee)
  );
  sumMetric.costToExercise = plusBigDecimalAtIndex(
    sumMetric.costToExercise,
    i,
    sumMetric.costToExercise[i].plus(metric.amount.times(DOPEX_EXERCISE_FEE))
  );

  sumMetric.totalPremiumsPaid = sumBigDecimalArray(sumMetric.premiumsPaid);
  sumMetric.totalFeesPaid = sumBigDecimalArray(sumMetric.feesPaid);
  sumMetric.totalCostToExercise = sumBigDecimalArray(sumMetric.costToExercise);
  sumMetric.save();

  return metric;
}

export function handleEpochStarted(
  timestamp: BigInt,
  assetAmount: BigInt,
  jonesAssetSupply: BigInt,
  asset: string
): JonesEpochStarted {
  const ssovc = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const ssovp = Curve2PoolSsovPut.bind(Address.fromString(assetToSSOVP(asset)));
  const ssovcEpoch = ssovc.currentEpoch().plus(BigInt.fromString("1"));
  const ssovpEpoch = ssovp.currentEpoch().plus(BigInt.fromString("1"));

  const decimals = assetToDecimals(asset);

  const metric = loadOrCreateJonesEpochStartedMetric(ssovcEpoch, ssovpEpoch, asset);
  metric.timestamp = timestamp;
  metric.amount = toDecimal(assetAmount, decimals);
  metric.jAssetAmount = toDecimal(jonesAssetSupply, decimals);
  metric.ssovcEpoch = ssovcEpoch;
  metric.ssovpEpoch = ssovpEpoch;

  metric.save();

  return metric;
}
