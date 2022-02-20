import { GohmSSOVV2 } from "./../../../generated/Chainlink/GohmSSOVV2";
import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { NewDeposit, NewPurchase } from "../../../generated/ETHSSOV/ArbEthSSOVV2";
import { ASSET_MGMT_MULTISIG, GOMH_SSOV_V2 } from "../../constants";
import { loadOrCreateSSOVDepositsStateMetric } from "../SSOVDepositsState";
import { handleNewDeposit, handleNewPurchase } from "../SSOVHandler";

export function handleNewDepositGOHM(event: NewDeposit): void {
  updateSSOVDepositsState(event.block.timestamp, "GOHM");

  if (event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    handleNewDeposit("GOHM", event);
  }
}

export function handleNewPurchaseGOHM(event: NewPurchase): void {
  updateSSOVDepositsState(event.block.timestamp, "GOHM");

  if (event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
    handleNewPurchase("GOHM", event);
  }
}

export function updateSSOVDepositsState(timestamp: BigInt, asset: string): void {
  const metric = loadOrCreateSSOVDepositsStateMetric(timestamp, asset);

  const user = Address.fromString(ASSET_MGMT_MULTISIG);

  const ssov = GohmSSOVV2.bind(Address.fromString(GOMH_SSOV_V2));
  const maybeEpoch = ssov.try_currentEpoch();
  if (!maybeEpoch.reverted) {
    metric.epoch = maybeEpoch.value;
  }

  const epoch = maybeEpoch.value;
  metric.user = user.toHexString();
  metric.asset = asset;

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = maybeStrikes.value;
  }

  const maybeTotalDeposits = ssov.try_getTotalEpochStrikeDeposits(epoch);
  const maybeUserDeposits = ssov.try_getUserEpochDeposits(epoch, user);

  if (!maybeTotalDeposits.reverted && !maybeUserDeposits.reverted) {
    metric.totalDeposits = maybeTotalDeposits.value;
    metric.userDeposits = maybeUserDeposits.value;
    const newOwnerships: BigDecimal[] = [];
    for (let i = 0; i < metric.totalDeposits.length; i++) {
      const totalDeposit = metric.totalDeposits[i];
      if (
        totalDeposit.equals(BigInt.fromString("0")) ||
        metric.userDeposits[i].equals(BigInt.fromString("0"))
      ) {
        newOwnerships.push(BigDecimal.fromString("0"));
      }
      newOwnerships.push(metric.userDeposits[i].divDecimal(totalDeposit.toBigDecimal()));
    }

    metric.ownership = newOwnerships;

    const maybeTotalPremiums = ssov.try_getTotalEpochPremium(epoch);
    if (!maybeTotalPremiums.reverted) {
      metric.totalPremiums = maybeTotalPremiums.value;
      const newUserPremiums: BigDecimal[] = [];
      for (let i = 0; i < metric.totalPremiums.length; i++) {
        const totalPremium = metric.totalPremiums[i];
        if (totalPremium.equals(BigInt.fromString("0"))) {
          newUserPremiums.push(BigDecimal.fromString("0"));
        }

        newUserPremiums.push(totalPremium.toBigDecimal().times(metric.ownership[i]));
      }

      metric.userPremiums = newUserPremiums;
    }
  }

  const maybeAssetPrice = ssov.try_getUsdPrice();
  if (!maybeAssetPrice.reverted) {
    metric.assetPrice = maybeAssetPrice.value;
  }

  metric.save();
}
