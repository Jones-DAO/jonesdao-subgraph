import {
  assetToDecimals,
  assetToSSOVC,
  plusBigDecimalAtIndex,
  sumBigDecimalArray
} from "./../helpers";
import { Address, BigInt, log } from "@graphprotocol/graph-ts";

import { toDecimal } from "../utils/Decimals";
import {
  loadOrCreateJonesEpochStartedMetric,
  loadOrCreateJonesSSOVCallDepositMetric,
  loadOrCreateJonesSSOVCallPurchaseMetric,
  loadOrCreateSummedJonesSSOVCallPurchaseMetric
} from "./VaultV2Metrics";
import {
  JonesEpochStarted,
  JonesSSOVCallDeposit,
  JonesSSOVCallPurchase
} from "../../generated/schema";
import { ArbEthSSOVV2 } from "../../generated/ETHSSOV/ArbEthSSOVV2";
import { DOPEX_EXERCISE_FEE } from "../constants";

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

export function handleEpochStarted(
  timestamp: BigInt,
  assetAmount: BigInt,
  jonesAssetSupply: BigInt,
  asset: string
): JonesEpochStarted {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const epoch = ssov.currentEpoch().plus(BigInt.fromString("1"));

  const decimals = assetToDecimals(asset);

  const metric = loadOrCreateJonesEpochStartedMetric(epoch, asset);
  metric.timestamp = timestamp;
  metric.amount = toDecimal(assetAmount, decimals);
  metric.jAssetAmount = toDecimal(jonesAssetSupply, decimals);
  metric.epoch = epoch; // epoch is also the ID of the metric

  metric.save();

  return metric;
}
