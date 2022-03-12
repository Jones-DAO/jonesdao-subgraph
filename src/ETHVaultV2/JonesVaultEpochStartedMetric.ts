import { ETHEpochStarted } from "./../../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateETHEpochStartedMetric(epoch: BigInt): ETHEpochStarted {
  let metric = ETHEpochStarted.load(epoch.toString());

  if (metric == null) {
    metric = new ETHEpochStarted(epoch.toString());
    metric.save();
  }

  return metric;
}
