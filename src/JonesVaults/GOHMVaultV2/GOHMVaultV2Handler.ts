import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit
} from "../../../generated/JonesGOHMVaultV2/JonesGOHMVaultV2";
import {
  handleEpochStarted,
  handleSSOVCallDeposit,
  handleSSOVCallPurchase
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

export function handleJonesVaultGOHMEpochStarted(event: EpochStarted): void {
  handleEpochStarted(
    event.params._timestamp,
    event.params._assetAmount,
    event.params._jonesAssetSupply,
    "GOHM"
  );
}
