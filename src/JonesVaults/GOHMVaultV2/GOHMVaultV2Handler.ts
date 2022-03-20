import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit
} from "../../../generated/JonesETHVaultV2/JonesArbETHVaultV2";
import {
  handleEpochStarted,
  handleSSOVCallDeposit,
  handleSSOVCallPurchase
} from "../VaultV2Handler";

export function handleJonesVaultGOHMCallDeposit(event: SSOVDeposit): void {
  handleSSOVCallDeposit(event, "GOHM");
}

export function handleJonesVaultGOHMCallPurchase(event: SSOVCallPurchase): void {
  handleSSOVCallPurchase(event, "GOHM");
}

export function handleJonesVaultGOHMEpochStarted(event: EpochStarted): void {
  handleEpochStarted(event, "GOHM");
}
