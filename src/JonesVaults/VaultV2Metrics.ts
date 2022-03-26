import {
  JonesEpochStarted,
  JonesSSOVCallDeposit,
  JonesSSOVCallPurchase,
  SummedJonesSSOVCallPurchase
} from "../../generated/schema";
import { BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

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
): SummedJonesSSOVCallPurchase {
  let metric = SummedJonesSSOVCallPurchase.load(asset + epoch.toString());

  if (metric == null) {
    metric = new SummedJonesSSOVCallPurchase(asset + epoch.toString());
    metric.asset = asset;
    metric.epoch = epoch;
    metric.strikes = strikes;

    let callsPurchased: BigDecimal[] = [];
    let premiumsPaid: BigDecimal[] = [];
    let feesPaid: BigDecimal[] = [];
    let costToExercise: BigDecimal[] = [];

    for (let i = 0; i < strikes.length; i++) {
      callsPurchased.push(BigDecimal.fromString("0"));
      premiumsPaid.push(BigDecimal.fromString("0"));
      feesPaid.push(BigDecimal.fromString("0"));
      costToExercise.push(BigDecimal.fromString("0"));
    }

    metric.callsPurchased = callsPurchased;
    metric.premiumsPaid = premiumsPaid;
    metric.feesPaid = feesPaid;
    metric.costToExercise = costToExercise;
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
): SummedJonesSSOVCallPurchase | null {
  return SummedJonesSSOVCallPurchase.load(asset + epoch.toString());
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
