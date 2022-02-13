import { GohmSSOVV2 } from "./../../../generated/GOHMSSOV/GohmSSOVV2";
import { Address, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import { ArbEthSSOVV2, NewDeposit, NewPurchase } from "../../../generated/ETHSSOV/ArbEthSSOVV2";
import { ASSET_MGMT_MULTISIG, ETH_SSOV_V2, GOMH_SSOV_V2 } from "../../constants";
import { handleNewDeposit, handleNewPurchase } from "../SSOVHandler";
import { loadOrCreateSSOVStateMetric } from "../SSOVMetric";
import { bytes } from "@protofire/subgraph-toolkit";

export function handleNewDepositGOHM(event: NewDeposit): void {
  handleNewDeposit("GOHM", event);
  updateSSOVState(event.block.timestamp, event.params.user);
}

export function handleNewPurchaseGOHM(event: NewPurchase): void {
  handleNewPurchase("GOHM", event);
  updateSSOVState(event.block.timestamp, event.params.user);
}

function updateSSOVState(timestamp: BigInt, user: Address): void {
  if (!user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    return;
  }

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
  metric.save();
}
