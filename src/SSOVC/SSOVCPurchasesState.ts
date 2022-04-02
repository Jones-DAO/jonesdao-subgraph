import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVCallPurchasesState } from "../../generated/schema";

export function loadOrCreateSSOVCallPurchasesStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): SSOVCallPurchasesState {
  let metric = SSOVCallPurchasesState.load(dateStr + asset);

  if (metric == null) {
    metric = new SSOVCallPurchasesState(dateStr + asset);
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

    metric.totalPremiumsPaid = BigDecimal.fromString("0");
    metric.totalFeesPaid = BigDecimal.fromString("0");
    metric.pnlPercentage = BigDecimal.fromString("0");
    metric.pnlUnderlying = BigDecimal.fromString("0");

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}
