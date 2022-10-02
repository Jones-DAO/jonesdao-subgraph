import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import { HedgingStrategyState } from "../../generated/schema";

export function loadOrCreateHedgingStrategyStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): HedgingStrategyState {
  let metric = HedgingStrategyState.load(timestamp.toString() + asset);

  if (metric == null) {
    metric = new HedgingStrategyState(timestamp.toString() + asset);
    metric.timestamp = timestamp;
    metric.dateStr = dateStr;
    metric.asset = asset;
    metric.totalUnderlyingValue = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}
