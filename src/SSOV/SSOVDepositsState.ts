import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVCallDepositsState } from "../../generated/schema";

export function loadOrCreateSSOVCallDepositsStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): SSOVCallDepositsState {
  let metric = SSOVCallDepositsState.load(dateStr + asset);

  if (metric == null) {
    metric = new SSOVCallDepositsState(dateStr + asset);
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

    metric.summedTotalDeposits = BigDecimal.fromString("0");
    metric.summedUserDeposits = BigDecimal.fromString("0");
    metric.summedOwnership = BigDecimal.fromString("0");
    metric.totalFarmRewards = BigDecimal.fromString("0");
    metric.userFarmRewards = BigDecimal.fromString("0");

    metric.pnlPercentage = BigDecimal.fromString("0");
    metric.pnlUnderlying = BigDecimal.fromString("0");

    metric.summedUserDepositRewards = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}
