import {
  JonesEpochStarted,
  JonesSSOVCallDeposit,
  JonesSSOVCallPurchase,
  SummedJonesSSOVCallPurchases
} from "../../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateJonesSSOVCallDepositMetric(
  timestamp: BigInt,
  asset: string,
  strikeIndex: BigInt
): JonesSSOVCallDeposit {
  let metric = JonesSSOVCallDeposit.load(timestamp.toString() + asset + strikeIndex.toString());

  if (metric == null) {
    metric = new JonesSSOVCallDeposit(timestamp.toString() + asset + strikeIndex.toString());
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("0");
    metric.strikeIndex = BigInt.fromString("0");
    metric.amount = BigDecimal.fromString("0");
    metric.save();
  }

  return metric;
}

export function loadOrCreateJonesSSOVCallPurchaseMetric(
  timestamp: BigInt,
  asset: string,
  strikeIndex: BigInt
): JonesSSOVCallPurchase {
  let metric = JonesSSOVCallPurchase.load(timestamp.toString() + asset + strikeIndex.toString());

  if (metric == null) {
    metric = new JonesSSOVCallPurchase(timestamp.toString() + asset + strikeIndex.toString());
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("0");
    metric.strikeIndex = BigInt.fromString("0");
    metric.amount = BigDecimal.fromString("0");
    metric.totalFee = BigDecimal.fromString("0");
    metric.premium = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}

export function loadOrCreateSummedJonesSSOVCallPurchaseMetric(
  asset: string,
  epoch: BigInt,
  strikes: BigInt[]
): SummedJonesSSOVCallPurchases {
  let metric = SummedJonesSSOVCallPurchases.load(asset + epoch.toString());

  if (metric == null) {
    metric = new SummedJonesSSOVCallPurchases(asset + epoch.toString());
    metric.asset = asset;
    metric.epoch = epoch;
    metric.strikes = strikes;

    metric.callsPurchased = [];
    metric.premiumsPaid = [];
    metric.feesPaid = [];
    metric.costToExercise = [];

    for (let i = 0; i < strikes.length; i++) {
      metric.callsPurchased.push(BigDecimal.fromString("0"));
      metric.premiumsPaid.push(BigDecimal.fromString("0"));
      metric.feesPaid.push(BigDecimal.fromString("0"));
      metric.costToExercise.push(BigDecimal.fromString("0"));
    }

    metric.totalPremiumsPaid = BigDecimal.fromString("0");
    metric.totalFeesPaid = BigDecimal.fromString("0");
    metric.totalCostToExercise = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}

export function loadSummedJonesSSOVCallPurchaseMetric(
  asset: string,
  epoch: BigInt
): SummedJonesSSOVCallPurchases | null {
  return SummedJonesSSOVCallPurchases.load(asset + epoch.toString());
}

export function loadOrCreateJonesEpochStartedMetric(
  epoch: BigInt,
  asset: string
): JonesEpochStarted {
  let metric = JonesEpochStarted.load(asset + epoch.toString());

  if (metric == null) {
    metric = new JonesEpochStarted(asset + epoch.toString());
    metric.save();
  }

  return metric;
}
