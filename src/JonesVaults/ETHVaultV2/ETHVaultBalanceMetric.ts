import { ETHBalance } from "../../../generated/schema";

const BALANCE_ID = "balance";

export function loadOrCreateETHBalanceMetric(): ETHBalance {
  let metric = ETHBalance.load(BALANCE_ID);
  if (metric == null) {
    // this would only happen once, after that we only update this
    metric = new ETHBalance(BALANCE_ID);
    metric.save();
  }

  return metric;
}
