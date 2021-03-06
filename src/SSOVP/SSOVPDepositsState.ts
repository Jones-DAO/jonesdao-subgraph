import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVPutDepositsState } from "../../generated/schema";

export function loadOrCreateSSOVPutDepositsStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string
): SSOVPutDepositsState {
  let metric = SSOVPutDepositsState.load(dateStr + asset);

  if (metric == null) {
    metric = new SSOVPutDepositsState(dateStr + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strikes = [];
    metric.userDeposits = [];
    metric.ownership = [];
    metric.userPremiums = [];
    metric.assetPrice = BigDecimal.fromString("-1");
    metric.positionsValueInUnderlying = BigDecimal.fromString("0");
    metric.user = "";

    metric.summedTotalDeposits = BigDecimal.fromString("0");
    metric.summedUserDeposits = BigDecimal.fromString("0");
    metric.summedOwnership = BigDecimal.fromString("0");

    metric.summedUserPremiums = BigDecimal.fromString("0");
    metric.totalPremiums = BigDecimal.fromString("0");
    metric.crvRewards = BigDecimal.fromString("0");
    metric.crvRewardsInUSD = BigDecimal.fromString("0");
    metric.crvRewardsInUnderlying = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}
