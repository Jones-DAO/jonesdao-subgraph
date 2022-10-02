import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SSOVDepositsState } from "../../generated/schema";

export function loadOrCreateSSOVDepositsStateMetric(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  optionType: string
): SSOVDepositsState {
  let metric = SSOVDepositsState.load(dateStr + asset + optionType);

  if (metric == null) {
    metric = new SSOVDepositsState(dateStr + asset + optionType);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.optionType = optionType;
    metric.pnlUnderlying = BigDecimal.fromString("0");
    metric.pnlPercentage = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}
