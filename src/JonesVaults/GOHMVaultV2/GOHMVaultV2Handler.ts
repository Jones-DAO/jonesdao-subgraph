import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit,
  SSOVPDeposit,
  SSOVPutPurchase
} from "../../../generated/JonesGOHMVaultV2/JonesTokenVaultV2";
import {
  handleEpochStarted,
  handleSSOVCallDeposit,
  handleSSOVCallPurchase,
  handleSSOVPutDeposit,
  handleSSOVPutPurchase
} from "../VaultV2Handler";

export function handleJonesVaultGOHMCallDeposit(event: SSOVDeposit): void {
  handleSSOVCallDeposit(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    "GOHM"
  );
}

export function handleJonesVaultGOHMCallPurchase(event: SSOVCallPurchase): void {
  handleSSOVCallPurchase(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    event.params._premium,
    event.params._totalFee,
    "GOHM"
  );
}

export function handleJonesVaultGOHMPutDeposit(event: SSOVPDeposit): void {
  handleSSOVPutDeposit(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    "GOHM"
  );
}

export function handleJonesVaultGOHMPutPurchase(event: SSOVPutPurchase): void {
  handleSSOVPutPurchase(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    event.params._premium,
    event.params._totalFee,
    "GOHM"
  );
}

export function handleJonesVaultGOHMEpochStarted(event: EpochStarted): void {
  handleEpochStarted(
    event.params._timestamp,
    event.params._assetAmount,
    event.params._jonesAssetSupply,
    "GOHM"
  );
}
