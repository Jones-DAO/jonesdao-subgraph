import { BigInt } from "@graphprotocol/graph-ts";
import { Heartbeat } from "../../generated/schema";

export function loadOrCreateHeartbeat(dateStr: string, timestamp: BigInt): Heartbeat {
  let metric = Heartbeat.load(dateStr);

  if (metric == null) {
    metric = new Heartbeat(dateStr);
    metric.timestamp = timestamp;

    metric.save();
  }

  return metric;
}
