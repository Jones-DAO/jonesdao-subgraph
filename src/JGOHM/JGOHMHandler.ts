import { getJGOHMToETHRatio } from "../utils/JGOHM";

import { Swap } from "../../generated/JonesETHVaultV1/UniswapV2Pair";
import { getGOHMPrice } from "../utils/GOHM";
import { loadOrCreateJGOHMMetric } from "./JGOHMMetric";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { timestampToISOHourString } from "../utils/Date";

export function handleSwap(event: Swap): void {
  let timestamp = event.block.timestamp;
  let dateStr = timestampToISOHourString(timestamp);
  let metric = loadOrCreateJGOHMMetric(dateStr, timestamp);

  if (metric.JGOHMToGOHMRatio.gt(BigDecimal.fromString("0"))) {
    // exit early if we already have an entry.
    return;
  }

  metric.GOHMUSDPrice = getGOHMPrice();
  metric.JGOHMToGOHMRatio = getJGOHMToETHRatio();
  metric.JGOHMUSDPrice = metric.GOHMUSDPrice.times(metric.JGOHMToGOHMRatio);

  metric.save();
}

export function collectJGOHMData(dateStr: string, timestamp: BigInt): void {
  let metric = loadOrCreateJGOHMMetric(dateStr, timestamp);
  metric.GOHMUSDPrice = getGOHMPrice();
  metric.JGOHMToGOHMRatio = getJGOHMToETHRatio();
  metric.JGOHMUSDPrice = metric.JGOHMUSDPrice.times(metric.JGOHMToGOHMRatio);
  metric.save();
}
