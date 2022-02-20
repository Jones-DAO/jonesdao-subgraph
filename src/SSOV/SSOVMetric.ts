import { SSOVDeposit, SSOVPurchase, SSOVState } from "../../generated/schema";
import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";

export function loadOrCreateSSOVDepositMetric(
  timestamp: BigInt,
  asset: string,
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
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}

export function loadOrCreateSSOVPurchaseMetric(
  timestamp: BigInt,
  asset: string,
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
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}

export function loadOrCreateSSOVStateMetric(timestamp: BigInt, asset: string): SSOVState {
  let metric = SSOVState.load(timestamp.toString() + asset);

  if (metric == null) {
    metric = new SSOVState(timestamp.toString() + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strikes = [];
    metric.deposits = [];
    metric.callsPurchased = [];
    metric.premiumsPaid = [];
    metric.user = "";

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}
