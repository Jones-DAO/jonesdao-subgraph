import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVPutPurchasesState } from "../../generated/schema";

export function loadOrCreateSSOVPutPurchasesStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): SSOVPutPurchasesState {
  let metric = SSOVPutPurchasesState.load(dateStr + asset);

  if (metric == null) {
    metric = new SSOVPutPurchasesState(dateStr + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strikes = [];
    metric.putsPurchased = [];
    metric.premiumsPaid = [];
    metric.feesPaid = [];
    metric.costToExercise = [];
    metric.assetPrice = BigDecimal.fromString("-1");
    metric.user = "";

    metric.totalPremiumsPaid = BigDecimal.fromString("0");
    metric.totalFeesPaid = BigDecimal.fromString("0");

    metric.positionsValueInUnderlying = BigDecimal.fromString("0");

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}
