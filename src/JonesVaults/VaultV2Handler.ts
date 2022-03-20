import { assetToDecimals, assetToSSOVC, sumBigDecimalArray } from "./../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit
} from "../../generated/JonesETHVaultV2/JonesArbETHVaultV2";
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

export function handleSSOVCallDeposit(event: SSOVDeposit, asset: string): JonesSSOVCallDeposit {
  const metric = loadOrCreateJonesSSOVCallDepositMetric(
    event.block.timestamp,
    asset,
    event.params._strikeIndex
  );
  metric.epoch = event.params._epoch.plus(BigInt.fromString("1"));
  metric.strikeIndex = event.params._strikeIndex;
  metric.amount = toDecimal(event.params._amount, assetToDecimals(asset));
  metric.save();

  return metric;
}

export function handleSSOVCallPurchase(
  event: SSOVCallPurchase,
  asset: string
): JonesSSOVCallPurchase {
  const metric = loadOrCreateJonesSSOVCallPurchaseMetric(
    event.block.timestamp,
    asset,
    event.params._strikeIndex
  );

  const assetDecimals = assetToDecimals(asset);

  metric.epoch = event.params._epoch;
  metric.strikeIndex = event.params._strikeIndex;
  metric.amount = toDecimal(event.params._amount, assetDecimals);
  metric.premium = toDecimal(event.params._premium, assetDecimals);
  metric.totalFee = toDecimal(event.params._totalFee, assetDecimals);
  metric.save();

  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const strikes = ssov.getEpochStrikes(metric.epoch);

  // We also want to maintain a metric showing the sum of all this epoch's purchases (per asset)
  const sumMetric = loadOrCreateSummedJonesSSOVCallPurchaseMetric(asset, metric.epoch, strikes);
  const i = metric.strikeIndex.toI32();
  sumMetric.callsPurchased[i] = sumMetric.callsPurchased[i].plus(metric.amount);
  sumMetric.premiumsPaid[i] = sumMetric.premiumsPaid[i].plus(metric.premium);
  sumMetric.feesPaid[i] = sumMetric.feesPaid[i].plus(metric.totalFee);
  sumMetric.costToExercise[i] = sumMetric.costToExercise[i].plus(
    metric.amount.times(DOPEX_EXERCISE_FEE)
  );

  sumMetric.totalPremiumsPaid = sumBigDecimalArray(sumMetric.premiumsPaid);
  sumMetric.totalFeesPaid = sumBigDecimalArray(sumMetric.feesPaid);
  sumMetric.totalCostToExercise = sumBigDecimalArray(sumMetric.costToExercise);

  return metric;
}

export function handleEpochStarted(event: EpochStarted, asset: string): JonesEpochStarted {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const epoch = ssov.currentEpoch().plus(BigInt.fromString("1"));

  const decimals = assetToDecimals(asset);

  const metric = loadOrCreateJonesEpochStartedMetric(epoch, asset);
  metric.timestamp = event.block.timestamp;
  metric.amount = toDecimal(event.params._assetAmount, decimals);
  metric.jAssetAmount = toDecimal(event.params._jonesAssetSupply, decimals);
  metric.epoch = epoch; // epoch is also the ID of the metric

  metric.save();

  return metric;
}
