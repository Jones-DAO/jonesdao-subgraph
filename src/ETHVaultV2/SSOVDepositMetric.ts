import { ETHSSOVDeposit } from "./../../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateETHSSOVDepositMetric(
  timestamp: BigInt,
  strikeIndex: BigInt
): ETHSSOVDeposit {
  let metric = ETHSSOVDeposit.load(timestamp.toString() + "-" + strikeIndex.toString());

  if (metric == null) {
    metric = new ETHSSOVDeposit(timestamp.toString() + "-" + strikeIndex.toString());
    metric.save();
  }

  return metric;
}
