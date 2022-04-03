import { BigInt } from "@graphprotocol/graph-ts";
import { JonesVaultPnL } from "../../generated/schema";

export function loadOrCreateJonesVaultPnLMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): JonesVaultPnL {
  let metric = JonesVaultPnL.load(timestamp.toString() + asset);

  if (metric == null) {
    metric = new JonesVaultPnL(timestamp.toString() + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.dateStr = dateStr;

    metric.save();
  }

  return metric;
}
