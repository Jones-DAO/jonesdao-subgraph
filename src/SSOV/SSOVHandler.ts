import { Address } from "@graphprotocol/graph-ts";
import { NewDeposit, NewPurchase } from "../../generated/ETHSSOV/ArbEthSSOVV2";
import { ASSET_MGMT_MULTISIG } from "../constants";
import { loadOrCreateSSOVDepositMetric, loadOrCreateSSOVPurchaseMetric } from "./SSOVMetric";

export function handleNewDeposit(asset: string, event: NewDeposit): void {
  if (!event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

  const metric = loadOrCreateSSOVDepositMetric(event.block.timestamp, asset);
  metric.epoch = event.params.epoch;
  metric.amount = event.params.amount;
  metric.strike = event.params.strike;
  metric.sender = event.params.sender;
  metric.user = event.params.user;

  metric.save();
}

export function handleNewPurchase(asset: string, event: NewPurchase): void {
  if (!event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

  const metric = loadOrCreateSSOVPurchaseMetric(event.block.timestamp, asset);
  metric.epoch = event.params.epoch;
  metric.amount = event.params.amount;
  metric.strike = event.params.strike;
  metric.fee = event.params.fee;
  metric.premium = event.params.premium;
  metric.sender = event.params.sender;
  metric.user = event.params.user;

  metric.save();
}
