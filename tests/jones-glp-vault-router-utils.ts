import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  BorrowStables,
  ClaimRewards,
  CompoundGlp,
  CompoundStables,
  DepositGlp,
  DepositStables,
  EmergencyPaused,
  EmergencyUnpaused,
  EmergencyWithdraw,
  GovernorUpdated,
  Paused,
  RedeemGlp,
  RedeemStable,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Unpaused,
  VaultDeposit,
  unCompoundGlp,
  unCompoundStables
} from "../generated/JonesGlpVaultRouter/JonesGlpVaultRouter"

export function createBorrowStablesEvent(
  _amountBorrowed: BigInt
): BorrowStables {
  let borrowStablesEvent = changetype<BorrowStables>(newMockEvent())

  borrowStablesEvent.parameters = new Array()

  borrowStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amountBorrowed",
      ethereum.Value.fromUnsignedBigInt(_amountBorrowed)
    )
  )

  return borrowStablesEvent
}



export function createClaimRewardsEvent(
  _to: Address,
  _stableAmount: BigInt,
  _wEthAmount: BigInt,
  _amountJones: BigInt
): ClaimRewards {
  let claimRewardsEvent = changetype<ClaimRewards>(newMockEvent())

  claimRewardsEvent.parameters = new Array()

  claimRewardsEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_stableAmount",
      ethereum.Value.fromUnsignedBigInt(_stableAmount)
    )
  )
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_wEthAmount",
      ethereum.Value.fromUnsignedBigInt(_wEthAmount)
    )
  )
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_amountJones",
      ethereum.Value.fromUnsignedBigInt(_amountJones)
    )
  )

  return claimRewardsEvent
}

export function createCompoundGlpEvent(
  _to: Address,
  _amount: BigInt
): CompoundGlp {
  let compoundGlpEvent = changetype<CompoundGlp>(newMockEvent())

  compoundGlpEvent.parameters = new Array()

  compoundGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  compoundGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return compoundGlpEvent
}

export function createCompoundStablesEvent(
  _to: Address,
  _amount: BigInt
): CompoundStables {
  let compoundStablesEvent = changetype<CompoundStables>(newMockEvent())

  compoundStablesEvent.parameters = new Array()

  compoundStablesEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  compoundStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return compoundStablesEvent
}

export function createDepositGlpEvent(
  _to: Address,
  _amount: BigInt,
  _sharesReceived: BigInt,
  _compound: boolean
): DepositGlp {
  let depositGlpEvent = changetype<DepositGlp>(newMockEvent())

  depositGlpEvent.parameters = new Array()

  depositGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  depositGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  depositGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_sharesReceived",
      ethereum.Value.fromUnsignedBigInt(_sharesReceived)
    )
  )
  depositGlpEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  )

  return depositGlpEvent
}

export function createDepositStablesEvent(
  _to: Address,
  _amount: BigInt,
  _sharesReceived: BigInt,
  _compound: boolean
): DepositStables {
  let depositStablesEvent = changetype<DepositStables>(newMockEvent())

  depositStablesEvent.parameters = new Array()

  depositStablesEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  depositStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  depositStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_sharesReceived",
      ethereum.Value.fromUnsignedBigInt(_sharesReceived)
    )
  )
  depositStablesEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  )

  return depositStablesEvent
}

export function createEmergencyPausedEvent(_account: Address): EmergencyPaused {
  let emergencyPausedEvent = changetype<EmergencyPaused>(newMockEvent())

  emergencyPausedEvent.parameters = new Array()

  emergencyPausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )

  return emergencyPausedEvent
}

export function createEmergencyUnpausedEvent(
  _account: Address
): EmergencyUnpaused {
  let emergencyUnpausedEvent = changetype<EmergencyUnpaused>(newMockEvent())

  emergencyUnpausedEvent.parameters = new Array()

  emergencyUnpausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )

  return emergencyUnpausedEvent
}

export function createEmergencyWithdrawEvent(
  _to: Address,
  _amount: BigInt
): EmergencyWithdraw {
  let emergencyWithdrawEvent = changetype<EmergencyWithdraw>(newMockEvent())

  emergencyWithdrawEvent.parameters = new Array()

  emergencyWithdrawEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  emergencyWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return emergencyWithdrawEvent
}

export function createGovernorUpdatedEvent(
  _oldGovernor: Address,
  _newGovernor: Address
): GovernorUpdated {
  let governorUpdatedEvent = changetype<GovernorUpdated>(newMockEvent())

  governorUpdatedEvent.parameters = new Array()

  governorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldGovernor",
      ethereum.Value.fromAddress(_oldGovernor)
    )
  )
  governorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_newGovernor",
      ethereum.Value.fromAddress(_newGovernor)
    )
  )

  return governorUpdatedEvent
}

export function createPausedEvent(_account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )

  return pausedEvent
}

export function createRedeemGlpEvent(
  _to: Address,
  _amount: BigInt,
  _retentions: BigInt,
  _ethRetentions: BigInt,
  _token: Address,
  _ethAmount: BigInt,
  _compound: boolean
): RedeemGlp {
  let redeemGlpEvent = changetype<RedeemGlp>(newMockEvent())

  redeemGlpEvent.parameters = new Array()

  redeemGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_retentions",
      ethereum.Value.fromUnsignedBigInt(_retentions)
    )
  )
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_ethRetentions",
      ethereum.Value.fromUnsignedBigInt(_ethRetentions)
    )
  )
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_ethAmount",
      ethereum.Value.fromUnsignedBigInt(_ethAmount)
    )
  )
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  )

  return redeemGlpEvent
}

export function createRedeemStableEvent(
  _to: Address,
  _amount: BigInt,
  _retentions: BigInt,
  _realRetentions: BigInt,
  _compound: boolean
): RedeemStable {
  let redeemStableEvent = changetype<RedeemStable>(newMockEvent())

  redeemStableEvent.parameters = new Array()

  redeemStableEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  redeemStableEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  redeemStableEvent.parameters.push(
    new ethereum.EventParam(
      "_retentions",
      ethereum.Value.fromUnsignedBigInt(_retentions)
    )
  )
  redeemStableEvent.parameters.push(
    new ethereum.EventParam(
      "_realRetentions",
      ethereum.Value.fromUnsignedBigInt(_realRetentions)
    )
  )
  redeemStableEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  )

  return redeemStableEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}



export function createUnpausedEvent(_account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  )

  return unpausedEvent
}

export function createVaultDepositEvent(
  vault: Address,
  _amount: BigInt,
  _retention: BigInt
): VaultDeposit {
  let vaultDepositEvent = changetype<VaultDeposit>(newMockEvent())

  vaultDepositEvent.parameters = new Array()

  vaultDepositEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  )
  vaultDepositEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  vaultDepositEvent.parameters.push(
    new ethereum.EventParam(
      "_retention",
      ethereum.Value.fromUnsignedBigInt(_retention)
    )
  )

  return vaultDepositEvent
}

export function createunCompoundGlpEvent(
  _to: Address,
  _amount: BigInt
): unCompoundGlp {
  let unCompoundGlpEvent = changetype<unCompoundGlp>(newMockEvent())

  unCompoundGlpEvent.parameters = new Array()

  unCompoundGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  unCompoundGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return unCompoundGlpEvent
}

export function createunCompoundStablesEvent(
  _to: Address,
  _amount: BigInt
): unCompoundStables {
  let unCompoundStablesEvent = changetype<unCompoundStables>(newMockEvent())

  unCompoundStablesEvent.parameters = new Array()

  unCompoundStablesEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  unCompoundStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return unCompoundStablesEvent
}
