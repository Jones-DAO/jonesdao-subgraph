import { BigInt } from "@graphprotocol/graph-ts";
import { getAssetPriceFromSSOVC, getJAssetRatioFromLP } from "../helpers";
import { loadOrCreateJAssetMetric } from "./JAssetMetric";

export function collectJAssetData(dateStr: string, asset: string, timestamp: BigInt): void {
  const metric = loadOrCreateJAssetMetric(dateStr, asset, timestamp);
  metric.AssetPrice = getAssetPriceFromSSOVC(asset);
  metric.JAssetToAssetRatio = getJAssetRatioFromLP(asset);
  metric.JAssetPrice = metric.AssetPrice.times(metric.JAssetToAssetRatio);
  metric.save();
}
