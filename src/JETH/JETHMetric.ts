import { JETHMetric } from "../../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateJETHMetric(dateStr: string, timestamp: BigInt): JETHMetric {
  let metric = JETHMetric.load(dateStr);

  if (metric == null) {
    metric = new JETHMetric(dateStr);
    metric.timestamp = timestamp;
    metric.ETHUSDPrice = BigDecimal.fromString("0");
    metric.JETHUSDPrice = BigDecimal.fromString("0");
    metric.JETHToETHRatio = BigDecimal.fromString("0");

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.save();
  }

  return metric;
}
