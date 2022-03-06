import { getJETHToETHRatio } from "./../utils/JETH";
import { Swap } from "../../generated/JonesETHVaultV1/UniswapV2Pair";
import { getWETHPrice } from "../utils/WETH";
import { loadOrCreateJETHMetric } from "./JETHMetric";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { timestampToISOHourString } from "../utils/Date";

export function handleSwap(event: Swap): void {
  let timestamp = event.block.timestamp;
  let dateStr = timestampToISOHourString(timestamp);
  let metric = loadOrCreateJETHMetric(dateStr, timestamp);

  if (metric.JETHToETHRatio.gt(BigDecimal.fromString("0"))) {
    // exit early if we already have an entry.
    return;
  }

  metric.ETHUSDPrice = getWETHPrice();
  metric.JETHToETHRatio = getJETHToETHRatio();
  metric.JETHUSDPrice = metric.ETHUSDPrice.times(metric.JETHToETHRatio);

  metric.save();
}

export function collectJETHData(dateStr: string, timestamp: BigInt): void {
  let metric = loadOrCreateJETHMetric(dateStr, timestamp);
  metric.ETHUSDPrice = getWETHPrice();
  metric.JETHToETHRatio = getJETHToETHRatio();
  metric.JETHUSDPrice = metric.ETHUSDPrice.times(metric.JETHToETHRatio);
  metric.save();
}
