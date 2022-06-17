import { BigInt } from "@graphprotocol/graph-ts";
import { GMXPositionState } from "../../generated/schema";

export function loadOrCreateGMXPositionMetric(hedgingAsset: string): GMXPositionState {
  let metric = GMXPositionState.load(hedgingAsset);

  if (metric == null) {
    metric = new GMXPositionState(hedgingAsset);
    metric.positions = [];

    metric.save();
  }

  return metric;
}

export function loadGMXPositionMetric(hedgingAsset: string): GMXPositionState | null {
  return GMXPositionState.load(hedgingAsset);
}
