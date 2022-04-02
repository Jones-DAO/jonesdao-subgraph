import {
  JonesEpochStarted,
  JonesSSOVCallDeposit,
  JonesSSOVCallPurchase,
  JonesSSOVPutDeposit,
  JonesSSOVPutPurchase,
  SummedJonesSSOVCallPurchase,
  SummedJonesSSOVPutPurchase
} from "../../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { getCombinedEpochID } from "../helpers";

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

export function loadOrCreateJonesSSOVPutDepositMetric(
  timestamp: BigInt,
  asset: string,
  strikeIndex: BigInt
): JonesSSOVPutDeposit {
  let metric = JonesSSOVPutDeposit.load(timestamp.toString() + asset + strikeIndex.toString());

  if (metric == null) {
    metric = new JonesSSOVPutDeposit(timestamp.toString() + asset + strikeIndex.toString());
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("0");
    metric.strikeIndex = BigInt.fromString("0");
    metric.amount = BigDecimal.fromString("0");
    metric.save();
  }

  return metric;
}

export function loadOrCreateJonesSSOVPutPurchaseMetric(
  timestamp: BigInt,
  asset: string,
  strikeIndex: BigInt
): JonesSSOVPutPurchase {
  let metric = JonesSSOVPutPurchase.load(timestamp.toString() + asset + strikeIndex.toString());

  if (metric == null) {
    metric = new JonesSSOVPutPurchase(timestamp.toString() + asset + strikeIndex.toString());
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

export function loadOrCreateSummedJonesSSOVPutPurchaseMetric(
  asset: string,
  epoch: BigInt,
  strikes: BigInt[]
): SummedJonesSSOVPutPurchase {
  let metric = SummedJonesSSOVPutPurchase.load(asset + epoch.toString());

  if (metric == null) {
    metric = new SummedJonesSSOVPutPurchase(asset + epoch.toString());
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

    metric.putsPurchased = callsPurchased;
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

export function loadSummedJonesSSOVPutPurchaseMetric(
  asset: string,
  epoch: BigInt
): SummedJonesSSOVPutPurchase | null {
  return SummedJonesSSOVPutPurchase.load(asset + epoch.toString());
}

export function loadOrCreateJonesEpochStartedMetric(
  ssovcEpoch: BigInt,
  ssovpEpoch: BigInt,
  asset: string
): JonesEpochStarted {
  let metric = JonesEpochStarted.load(asset + getCombinedEpochID(ssovcEpoch, ssovpEpoch));

  if (metric == null) {
    metric = new JonesEpochStarted(asset + getCombinedEpochID(ssovcEpoch, ssovpEpoch));
    metric.save();
  }

  return metric;
}
