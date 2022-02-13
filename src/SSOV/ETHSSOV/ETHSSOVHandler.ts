import { ArbEthSSOVV2 } from "./../../../generated/ETHSSOV/ArbEthSSOVV2";
import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { NewDeposit, NewPurchase } from "../../../generated/ETHSSOV/ArbEthSSOVV2";
import { handleNewDeposit, handleNewPurchase } from "../SSOVHandler";
import { loadOrCreateSSOVStateMetric } from "../SSOVMetric";
import { ASSET_MGMT_MULTISIG, ETH_SSOV_V2 } from "../../constants";
import { bytes } from "@protofire/subgraph-toolkit";

export function handleNewDepositETH(event: NewDeposit): void {
  handleNewDeposit("ETH", event);
  updateSSOVState(event.block.timestamp, event.params.user);
}

export function handleNewPurchaseETH(event: NewPurchase): void {
  handleNewPurchase("ETH", event);
  updateSSOVState(event.block.timestamp, event.params.user);
}

function updateSSOVState(timestamp: BigInt, user: Address): void {
  if (!user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

  const metric = loadOrCreateSSOVStateMetric(timestamp, "ETH");
  const ssov = ArbEthSSOVV2.bind(Address.fromString(ETH_SSOV_V2));
  const epoch = ssov.currentEpoch();

  metric.epoch = epoch;
  metric.user = user.toHexString();
  metric.asset = "ETH";

  const maybeDeposits = ssov.try_getUserEpochDeposits(epoch, user);
  if (!maybeDeposits.reverted) {
    metric.deposits = maybeDeposits.value;
  }

  const maybeCallsPurchased = ssov.try_getUserEpochCallsPurchased(epoch, user);
  if (!maybeCallsPurchased.reverted) {
    metric.callsPurchased = maybeCallsPurchased.value;
  }

  const maybePremiumsPaid = ssov.try_getUserEpochPremium(epoch, user);
  if (!maybePremiumsPaid.reverted) {
    metric.premiumsPaid = maybePremiumsPaid.value;
  }

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = maybeStrikes.value;
  }

  metric.save();
}
