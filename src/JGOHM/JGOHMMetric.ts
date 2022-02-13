import { JGOHMMetric } from "../../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateJGOHMMetric(dateStr: string, timestamp: BigInt): JGOHMMetric {
  let metric = JGOHMMetric.load(dateStr);

  if (metric == null) {
    metric = new JGOHMMetric(dateStr);
    metric.timestamp = timestamp;
    metric.GOHMUSDPrice = BigDecimal.fromString("0");
    metric.JGOHMUSDPrice = BigDecimal.fromString("0");
    metric.JGOHMToGOHMRatio = BigDecimal.fromString("0");

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.save();
  }

  return metric;
}
