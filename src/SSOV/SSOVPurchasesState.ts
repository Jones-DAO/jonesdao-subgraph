import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVPurchasesState } from "../../generated/schema";

export function loadOrCreateSSOVPurchasesStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): SSOVPurchasesState {
  let metric = SSOVPurchasesState.load(dateStr + asset);

  if (metric == null) {
    metric = new SSOVPurchasesState(dateStr + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strikes = [];
    metric.callsPurchased = [];
    metric.premiumsPaid = [];
    metric.feesPaid = [];
    metric.costToExercise = [];
    metric.assetPrice = BigDecimal.fromString("-1");
    metric.user = "";

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}
