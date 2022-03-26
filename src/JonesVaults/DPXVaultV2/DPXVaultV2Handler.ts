import { log } from "@graphprotocol/graph-ts";
import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit
} from "../../../generated/JonesDPXVaultV2/JonesDPXVaultV2";
import {
  handleEpochStarted,
  handleSSOVCallDeposit,
  handleSSOVCallPurchase
} from "../VaultV2Handler";

export function handleJonesVaultDPXCallDeposit(event: SSOVDeposit): void {
  log.warning("DPX call deposit event", []);

  handleSSOVCallDeposit(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    "DPX"
  );
}

export function handleJonesVaultDPXCallPurchase(event: SSOVCallPurchase): void {
  log.warning("DPX call purchase event", []);
  handleSSOVCallPurchase(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    event.params._premium,
    event.params._totalFee,
    "DPX"
  );
}

export function handleJonesVaultDPXEpochStarted(event: EpochStarted): void {
  handleEpochStarted(
    event.params._timestamp,
    event.params._assetAmount,
    event.params._jonesAssetSupply,
    "DPX"
  );
}
