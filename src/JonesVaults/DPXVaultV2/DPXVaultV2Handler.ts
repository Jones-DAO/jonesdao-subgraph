import { log } from "@graphprotocol/graph-ts";
import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit,
  SSOVPDeposit,
  SSOVPutPurchase
} from "../../../generated/JonesDPXVaultV2/JonesTokenVaultV2";
import {
  handleEpochStarted,
  handleSSOVCallDeposit,
  handleSSOVCallPurchase,
  handleSSOVPutDeposit,
  handleSSOVPutPurchase
} from "../VaultV2Handler";

export function handleJonesVaultDPXCallDeposit(event: SSOVDeposit): void {
  handleSSOVCallDeposit(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    "DPX"
  );
}

export function handleJonesVaultDPXCallPurchase(event: SSOVCallPurchase): void {
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

export function handleJonesVaultDPXPutDeposit(event: SSOVPDeposit): void {
  handleSSOVPutDeposit(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    "DPX"
  );
}

export function handleJonesVaultDPXPutPurchase(event: SSOVPutPurchase): void {
  handleSSOVPutPurchase(
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
