import { JAssetMetric } from "../../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateJAssetMetric(
  dateStr: string,
  asset: string,
  timestamp: BigInt
): JAssetMetric {
  let metric = JAssetMetric.load(dateStr + asset);

  if (metric == null) {
    metric = new JAssetMetric(dateStr + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.AssetPrice = BigDecimal.fromString("0");
    metric.JAssetPrice = BigDecimal.fromString("0");
    metric.JAssetToAssetRatio = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}
