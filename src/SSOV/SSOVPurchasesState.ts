import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVPurchasesState } from "../../generated/schema";

export function loadOrCreateSSOVPurchasesStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  optionType: string
): SSOVPurchasesState {
  let metric = SSOVPurchasesState.load(dateStr + asset + optionType);

  if (metric == null) {
    metric = new SSOVPurchasesState(dateStr + asset + optionType);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.optionType = optionType;
    metric.epoch = BigInt.fromString("-1");
    metric.strategy = "";
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
