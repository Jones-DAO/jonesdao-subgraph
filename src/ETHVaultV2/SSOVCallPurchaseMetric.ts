import { ETHSSOVCallPurchase } from "./../../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateETHSSOVCallPurchaseMetric(
  timestamp: BigInt,
  strikeIndex: BigInt
): ETHSSOVCallPurchase {
  let metric = ETHSSOVCallPurchase.load(timestamp.toString() + "-" + strikeIndex.toString());

  if (metric == null) {
    metric = new ETHSSOVCallPurchase(timestamp.toString() + "-" + strikeIndex.toString());
    metric.save();
  }

  return metric;
}
