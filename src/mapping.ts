import {
  Claimed,
  DepositFromMultisig,
  Deposited,
  OwnershipTransferred,
  SnapshotBalance,
  WithdrawalToMultisig
} from "../generated/JonesETHVaultV1/JonesETHVaultV1";

export function handleClaimed(event: Claimed): void {}

export function handleDepositFromMultisig(event: DepositFromMultisig): void {}

export function handleDeposited(event: Deposited): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSnapshotBalance(event: SnapshotBalance): void {}

export function handleWithdrawalToMultisig(event: WithdrawalToMultisig): void {}
