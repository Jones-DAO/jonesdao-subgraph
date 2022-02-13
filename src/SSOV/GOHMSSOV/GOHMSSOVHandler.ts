import { GohmSSOVV2 } from "./../../../generated/GOHMSSOV/GohmSSOVV2";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { NewDeposit, NewPurchase } from "../../../generated/ETHSSOV/ArbEthSSOVV2";
import { ASSET_MGMT_MULTISIG, GOMH_SSOV_V2 } from "../../constants";
import { handleNewDeposit, handleNewPurchase } from "../SSOVHandler";
import { loadOrCreateSSOVStateMetric } from "../SSOVMetric";

export function handleNewDepositGOHM(event: NewDeposit): void {
  if (!event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

  updateSSOVState(event.block.timestamp, event.params.user);
  handleNewDeposit("GOHM", event);
}

export function handleNewPurchaseGOHM(event: NewPurchase): void {
  if (!event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

  updateSSOVState(event.block.timestamp, event.params.user);
  handleNewPurchase("GOHM", event);
}

function updateSSOVState(timestamp: BigInt, user: Address): void {
  const metric = loadOrCreateSSOVStateMetric(timestamp, "GOHM");
  const ssov = GohmSSOVV2.bind(Address.fromString(GOMH_SSOV_V2));
  const epoch = ssov.currentEpoch();

  metric.epoch = epoch;
  metric.user = user.toHexString();
  metric.asset = "GOHM";
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
