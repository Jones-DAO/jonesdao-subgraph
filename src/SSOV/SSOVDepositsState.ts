import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVDepositsState } from "../../generated/schema";

export function loadOrCreateSSOVDepositsStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): SSOVDepositsState {
  let metric = SSOVDepositsState.load(dateStr + asset);

  if (metric == null) {
    metric = new SSOVDepositsState(dateStr + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strikes = [];
    metric.userDeposits = [];
    metric.totalPremiums = [];
    metric.ownership = [];
    metric.userPremiums = [];
    metric.assetPrice = BigDecimal.fromString("-1");
    metric.user = "";

    metric.save();
  }

  return metric;
}
