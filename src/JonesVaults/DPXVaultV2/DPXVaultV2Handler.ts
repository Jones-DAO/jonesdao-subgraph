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

export function handleJonesVaultDPXCallDeposit(event: SSOVDeposit): void {
  handleSSOVCallDeposit(event, "DPX");
}

export function handleJonesVaultDPXCallPurchase(event: SSOVCallPurchase): void {
  handleSSOVCallPurchase(event, "DPX");
}

export function handleJonesVaultDPXEpochStarted(event: EpochStarted): void {
  handleEpochStarted(event, "DPX");
}
