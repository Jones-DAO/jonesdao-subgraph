import { SSOVPutDeposit, SSOVPutPurchase } from "../../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

// TODO Implement these but from JONES Events
export function loadOrCreateSSOVPutDepositMetric(
  timestamp: BigInt,
  asset: string,
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

// TODO Implement these but from JONES Events
export function loadOrCreateSSOVPutPurchaseMetric(
  timestamp: BigInt,
  asset: string,
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
