import { SSOVDeposit, SSOVPurchase, SSOVPutDeposit, SSOVPutPurchase } from "../../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function loadOrCreateSSOVDepositMetric(
  timestamp: BigInt,
  asset: string,
  dateStr: string,
  strike: BigInt
): SSOVDeposit {
  let metric = SSOVDeposit.load(timestamp.toString() + asset + strike.toString());

  if (metric == null) {
    metric = new SSOVDeposit(timestamp.toString() + asset + strike.toString());
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strike = BigInt.fromString("-1");
    metric.amount = BigInt.fromString("-1");
    metric.user = Bytes.empty();
    metric.sender = Bytes.empty();

    metric.save();
  }

  return metric;
}

export function loadOrCreateSSOVPurchaseMetric(
  timestamp: BigInt,
  asset: string,
  dateStr: string,
  strike: BigInt
): SSOVPurchase {
  let metric = SSOVPurchase.load(timestamp.toString() + asset + strike.toString());

  if (metric == null) {
    metric = new SSOVPurchase(timestamp.toString() + asset + strike.toString());
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strike = BigInt.fromString("-1");
    metric.amount = BigInt.fromString("-1");
    metric.fee = BigInt.fromString("-1");
    metric.premium = BigInt.fromString("-1");
    metric.user = Bytes.empty();
    metric.sender = Bytes.empty();

    metric.save();
  }

  return metric;
}

export function loadOrCreateSSOVPutDepositMetric(
  timestamp: BigInt,
  asset: string,
  dateStr: string,
  strike: BigInt
): SSOVPutDeposit {
  let metric = SSOVPutDeposit.load(timestamp.toString() + asset + strike.toString());

  if (metric == null) {
    metric = new SSOVPutDeposit(timestamp.toString() + asset + strike.toString());
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strike = BigInt.fromString("-1");
    metric.amount = BigInt.fromString("-1");
    metric.user = Bytes.empty();
    metric.sender = Bytes.empty();

    metric.save();
  }

  return metric;
}

export function loadOrCreateSSOVPutPurchaseMetric(
  timestamp: BigInt,
  asset: string,
  dateStr: string,
  strike: BigInt
): SSOVPutPurchase {
  let metric = SSOVPutPurchase.load(timestamp.toString() + asset + strike.toString());

  if (metric == null) {
    metric = new SSOVPutPurchase(timestamp.toString() + asset + strike.toString());
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strike = BigInt.fromString("-1");
    metric.amount = BigInt.fromString("-1");
    metric.fee = BigInt.fromString("-1");
    metric.premium = BigInt.fromString("-1");
    metric.user = Bytes.empty();
    metric.sender = Bytes.empty();

    metric.save();
  }

  return metric;
}
