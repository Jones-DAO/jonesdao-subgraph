import { ArbEthSSOVV2 } from "./../../../generated/ETHSSOV/ArbEthSSOVV2";
import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { NewDeposit, NewPurchase } from "../../../generated/ETHSSOV/ArbEthSSOVV2";
import { handleNewDeposit, handleNewPurchase } from "../SSOVHandler";
import { loadOrCreateSSOVStateMetric } from "../SSOVMetric";
import { ASSET_MGMT_MULTISIG, ETH_SSOV_V2 } from "../../constants";

export function handleNewDepositETH(event: NewDeposit): void {
  if (!event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

  log.warning("Handling deposit ts={}", [event.block.timestamp.toString()]);
  updateSSOVState(event.block.timestamp, event.params.user);
  handleNewDeposit("ETH", event);
}

export function handleNewPurchaseETH(event: NewPurchase): void {
  if (!event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

  log.warning("Handling deposit ts={}", [event.block.timestamp.toString()]);
  updateSSOVState(event.block.timestamp, event.params.user);
  handleNewPurchase("ETH", event);
}

function updateSSOVState(timestamp: BigInt, user: Address): void {
  log.warning("Handling state update ts={}", [timestamp.toString()]);
  const metric = loadOrCreateSSOVStateMetric(timestamp, "ETH");
  log.warning("State update saved ts={}", [timestamp.toString()]);
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
