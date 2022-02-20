import { BigInt } from "@graphprotocol/graph-ts";
import { SSOVPurchasesState } from "../../generated/schema";

export function loadOrCreateSSOVPurchasesStateMetric(
  timestamp: BigInt,
  asset: string
): SSOVPurchasesState {
  let metric = SSOVPurchasesState.load(timestamp.toString() + asset);

  if (metric == null) {
    metric = new SSOVPurchasesState(timestamp.toString() + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strikes = [];
    metric.callsPurchased = [];
    metric.premiumsPaid = [];
    metric.assetPrice = BigInt.fromString("-1");
    metric.user = "";

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}
