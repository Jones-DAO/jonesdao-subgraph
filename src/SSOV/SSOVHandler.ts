import { NewDeposit, NewPurchase } from "../../generated/ETHSSOV/ArbEthSSOVV2";
import { loadOrCreateSSOVDepositMetric, loadOrCreateSSOVPurchaseMetric } from "./SSOVMetric";

export function handleNewDeposit(asset: string, event: NewDeposit): void {
  const metric = loadOrCreateSSOVDepositMetric(event.block.timestamp, asset, event.params.strike);
  metric.epoch = event.params.epoch;
  metric.amount = event.params.amount;
  metric.strike = event.params.strike;
  metric.sender = event.params.sender;
  metric.user = event.params.user;

  metric.save();
}

export function handleNewPurchase(asset: string, event: NewPurchase): void {
  const metric = loadOrCreateSSOVPurchaseMetric(event.block.timestamp, asset, event.params.strike);
  metric.epoch = event.params.epoch;
  metric.amount = event.params.amount;
  metric.strike = event.params.strike;
  metric.fee = event.params.fee;
  metric.premium = event.params.premium;
  metric.sender = event.params.sender;
  metric.user = event.params.user;

  metric.save();
}
