import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
import {
  BorrowStables,
  ClaimRewards,
  CompoundGlp,
  CompoundStables,
  DepositGlp,
  DepositStables,
  EmergencyPaused,
  EmergencyUnpaused,
  GovernorUpdated,
  Paused,
  RedeemGlp,
  RedeemGlpBasket,
  RedeemGlpEth,
  RedeemStable,
  RetentionCharged,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SetJonesLeverageStrategy,
  SetJonesRewards,
  SettleEpoch,
  Unpaused,
  UpdateAdapter,
  UpdateGlpAddress,
  UpdateGlpCompoundRewards,
  UpdateGlpRewardTracker,
  UpdateGlpVault,
  UpdateIncentiveReceiver,
  UpdateStableAddress,
  UpdateStableCompoundRewards,
  UpdateStableRewardTracker,
  UpdateStableVault,
  UpdateWithdrawalRetention,
  VaultDeposit,
  unCompoundGlp,
  unCompoundStables,
} from "../generated/JonesGlpVaultRouterOld/JonesGlpVaultRouterOld";

export function createBorrowStablesEvent(
  _amountBorrowed: BigInt
): BorrowStables {
  let borrowStablesEvent = changetype<BorrowStables>(newMockEvent());

  borrowStablesEvent.parameters = new Array();

  borrowStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amountBorrowed",
      ethereum.Value.fromUnsignedBigInt(_amountBorrowed)
    )
  );

  return borrowStablesEvent;
}

export function createClaimRewardsEvent(
  _to: Address,
  _stableAmount: BigInt,
  _wEthAmount: BigInt,
  _amountJones: BigInt
): ClaimRewards {
  let claimRewardsEvent = changetype<ClaimRewards>(newMockEvent());

  claimRewardsEvent.parameters = new Array();

  claimRewardsEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_stableAmount",
      ethereum.Value.fromUnsignedBigInt(_stableAmount)
    )
  );
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_wEthAmount",
      ethereum.Value.fromUnsignedBigInt(_wEthAmount)
    )
  );
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_amountJones",
      ethereum.Value.fromUnsignedBigInt(_amountJones)
    )
  );

  return claimRewardsEvent;
}

export function createCompoundGlpEvent(
  _to: Address,
  _amount: BigInt
): CompoundGlp {
  let compoundGlpEvent = changetype<CompoundGlp>(newMockEvent());

  compoundGlpEvent.parameters = new Array();

  compoundGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  compoundGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );

  return compoundGlpEvent;
}

export function createCompoundStablesEvent(
  _to: Address,
  _amount: BigInt
): CompoundStables {
  let compoundStablesEvent = changetype<CompoundStables>(newMockEvent());

  compoundStablesEvent.parameters = new Array();

  compoundStablesEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  compoundStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );

  return compoundStablesEvent;
}

export function createDepositGlpEvent(
  _to: Address,
  _amount: BigInt,
  _sharesReceived: BigInt,
  _compound: boolean
): DepositGlp {
  let depositGlpEvent = changetype<DepositGlp>(newMockEvent());

  depositGlpEvent.parameters = new Array();

  depositGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  depositGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );
  depositGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_sharesReceived",
      ethereum.Value.fromUnsignedBigInt(_sharesReceived)
    )
  );
  depositGlpEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  );

  return depositGlpEvent;
}

export function createDepositStablesEvent(
  _to: Address,
  _amount: BigInt,
  _sharesReceived: BigInt,
  _compound: boolean
): DepositStables {
  let depositStablesEvent = changetype<DepositStables>(newMockEvent());

  depositStablesEvent.parameters = new Array();

  depositStablesEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  depositStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );
  depositStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_sharesReceived",
      ethereum.Value.fromUnsignedBigInt(_sharesReceived)
    )
  );
  depositStablesEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  );

  return depositStablesEvent;
}

export function createEmergencyPausedEvent(_account: Address): EmergencyPaused {
  let emergencyPausedEvent = changetype<EmergencyPaused>(newMockEvent());

  emergencyPausedEvent.parameters = new Array();

  emergencyPausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  );

  return emergencyPausedEvent;
}

export function createEmergencyUnpausedEvent(
  _account: Address
): EmergencyUnpaused {
  let emergencyUnpausedEvent = changetype<EmergencyUnpaused>(newMockEvent());

  emergencyUnpausedEvent.parameters = new Array();

  emergencyUnpausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  );

  return emergencyUnpausedEvent;
}

export function createGovernorUpdatedEvent(
  _oldGovernor: Address,
  _newGovernor: Address
): GovernorUpdated {
  let governorUpdatedEvent = changetype<GovernorUpdated>(newMockEvent());

  governorUpdatedEvent.parameters = new Array();

  governorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldGovernor",
      ethereum.Value.fromAddress(_oldGovernor)
    )
  );
  governorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "_newGovernor",
      ethereum.Value.fromAddress(_newGovernor)
    )
  );

  return governorUpdatedEvent;
}

export function createPausedEvent(_account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent());

  pausedEvent.parameters = new Array();

  pausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  );

  return pausedEvent;
}

export function createRedeemGlpEvent(
  _to: Address,
  _amount: BigInt,
  _retentions: BigInt,
  _ethRetentions: BigInt,
  _compound: boolean
): RedeemGlp {
  let redeemGlpEvent = changetype<RedeemGlp>(newMockEvent());

  redeemGlpEvent.parameters = new Array();

  redeemGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_retentions",
      ethereum.Value.fromUnsignedBigInt(_retentions)
    )
  );
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_ethRetentions",
      ethereum.Value.fromUnsignedBigInt(_ethRetentions)
    )
  );
  redeemGlpEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  );

  return redeemGlpEvent;
}

export function createRedeemGlpBasketEvent(
  _to: Address,
  _amount: BigInt,
  _retentions: BigInt,
  _ethRetentions: BigInt,
  _token: Address,
  _compound: boolean
): RedeemGlpBasket {
  let redeemGlpBasketEvent = changetype<RedeemGlpBasket>(newMockEvent());

  redeemGlpBasketEvent.parameters = new Array();

  redeemGlpBasketEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  redeemGlpBasketEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );
  redeemGlpBasketEvent.parameters.push(
    new ethereum.EventParam(
      "_retentions",
      ethereum.Value.fromUnsignedBigInt(_retentions)
    )
  );
  redeemGlpBasketEvent.parameters.push(
    new ethereum.EventParam(
      "_ethRetentions",
      ethereum.Value.fromUnsignedBigInt(_ethRetentions)
    )
  );
  redeemGlpBasketEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  );
  redeemGlpBasketEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  );

  return redeemGlpBasketEvent;
}

export function createRedeemGlpEthEvent(
  _to: Address,
  _amount: BigInt,
  _retentions: BigInt,
  _ethRetentions: BigInt,
  _ethAmount: BigInt
): RedeemGlpEth {
  let redeemGlpEthEvent = changetype<RedeemGlpEth>(newMockEvent());

  redeemGlpEthEvent.parameters = new Array();

  redeemGlpEthEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  redeemGlpEthEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );
  redeemGlpEthEvent.parameters.push(
    new ethereum.EventParam(
      "_retentions",
      ethereum.Value.fromUnsignedBigInt(_retentions)
    )
  );
  redeemGlpEthEvent.parameters.push(
    new ethereum.EventParam(
      "_ethRetentions",
      ethereum.Value.fromUnsignedBigInt(_ethRetentions)
    )
  );
  redeemGlpEthEvent.parameters.push(
    new ethereum.EventParam(
      "_ethAmount",
      ethereum.Value.fromUnsignedBigInt(_ethAmount)
    )
  );

  return redeemGlpEthEvent;
}

export function createRedeemStableEvent(
  _to: Address,
  _amount: BigInt,
  _retentions: BigInt,
  _realRetentions: BigInt,
  _compound: boolean
): RedeemStable {
  let redeemStableEvent = changetype<RedeemStable>(newMockEvent());

  redeemStableEvent.parameters = new Array();

  redeemStableEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  redeemStableEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );
  redeemStableEvent.parameters.push(
    new ethereum.EventParam(
      "_retentions",
      ethereum.Value.fromUnsignedBigInt(_retentions)
    )
  );
  redeemStableEvent.parameters.push(
    new ethereum.EventParam(
      "_realRetentions",
      ethereum.Value.fromUnsignedBigInt(_realRetentions)
    )
  );
  redeemStableEvent.parameters.push(
    new ethereum.EventParam("_compound", ethereum.Value.fromBoolean(_compound))
  );

  return redeemStableEvent;
}

export function createRetentionChargedEvent(
  _retentions: BigInt
): RetentionCharged {
  let retentionChargedEvent = changetype<RetentionCharged>(newMockEvent());

  retentionChargedEvent.parameters = new Array();

  retentionChargedEvent.parameters.push(
    new ethereum.EventParam(
      "_retentions",
      ethereum.Value.fromUnsignedBigInt(_retentions)
    )
  );

  return retentionChargedEvent;
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent());

  roleAdminChangedEvent.parameters = new Array();

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  );

  return roleAdminChangedEvent;
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent());

  roleGrantedEvent.parameters = new Array();

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleGrantedEvent;
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent());

  roleRevokedEvent.parameters = new Array();

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleRevokedEvent;
}

export function createSetJonesLeverageStrategyEvent(
  _previousADdress: Address,
  _newAddress: Address
): SetJonesLeverageStrategy {
  let setJonesLeverageStrategyEvent = changetype<SetJonesLeverageStrategy>(
    newMockEvent()
  );

  setJonesLeverageStrategyEvent.parameters = new Array();

  setJonesLeverageStrategyEvent.parameters.push(
    new ethereum.EventParam(
      "_previousADdress",
      ethereum.Value.fromAddress(_previousADdress)
    )
  );
  setJonesLeverageStrategyEvent.parameters.push(
    new ethereum.EventParam(
      "_newAddress",
      ethereum.Value.fromAddress(_newAddress)
    )
  );

  return setJonesLeverageStrategyEvent;
}

export function createSetJonesRewardsEvent(
  _previousAddress: Address,
  _newAddress: Address
): SetJonesRewards {
  let setJonesRewardsEvent = changetype<SetJonesRewards>(newMockEvent());

  setJonesRewardsEvent.parameters = new Array();

  setJonesRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_previousAddress",
      ethereum.Value.fromAddress(_previousAddress)
    )
  );
  setJonesRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_newAddress",
      ethereum.Value.fromAddress(_newAddress)
    )
  );

  return setJonesRewardsEvent;
}

export function createSettleEpochEvent(
  _currentEpochTs: BigInt,
  _targetEpochTs: BigInt
): SettleEpoch {
  let settleEpochEvent = changetype<SettleEpoch>(newMockEvent());

  settleEpochEvent.parameters = new Array();

  settleEpochEvent.parameters.push(
    new ethereum.EventParam(
      "_currentEpochTs",
      ethereum.Value.fromUnsignedBigInt(_currentEpochTs)
    )
  );
  settleEpochEvent.parameters.push(
    new ethereum.EventParam(
      "_targetEpochTs",
      ethereum.Value.fromUnsignedBigInt(_targetEpochTs)
    )
  );

  return settleEpochEvent;
}

export function createUnpausedEvent(_account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent());

  unpausedEvent.parameters = new Array();

  unpausedEvent.parameters.push(
    new ethereum.EventParam("_account", ethereum.Value.fromAddress(_account))
  );

  return unpausedEvent;
}

export function createUpdateAdapterEvent(
  _oldAdapter: Address,
  _newAdapter: Address
): UpdateAdapter {
  let updateAdapterEvent = changetype<UpdateAdapter>(newMockEvent());

  updateAdapterEvent.parameters = new Array();

  updateAdapterEvent.parameters.push(
    new ethereum.EventParam(
      "_oldAdapter",
      ethereum.Value.fromAddress(_oldAdapter)
    )
  );
  updateAdapterEvent.parameters.push(
    new ethereum.EventParam(
      "_newAdapter",
      ethereum.Value.fromAddress(_newAdapter)
    )
  );

  return updateAdapterEvent;
}

export function createUpdateGlpAddressEvent(
  _oldGlpAddress: Address,
  _newGlpAddress: Address
): UpdateGlpAddress {
  let updateGlpAddressEvent = changetype<UpdateGlpAddress>(newMockEvent());

  updateGlpAddressEvent.parameters = new Array();

  updateGlpAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_oldGlpAddress",
      ethereum.Value.fromAddress(_oldGlpAddress)
    )
  );
  updateGlpAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_newGlpAddress",
      ethereum.Value.fromAddress(_newGlpAddress)
    )
  );

  return updateGlpAddressEvent;
}

export function createUpdateGlpCompoundRewardsEvent(
  _oldGlpeCompounder: Address,
  _newGlpCompounder: Address
): UpdateGlpCompoundRewards {
  let updateGlpCompoundRewardsEvent = changetype<UpdateGlpCompoundRewards>(
    newMockEvent()
  );

  updateGlpCompoundRewardsEvent.parameters = new Array();

  updateGlpCompoundRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_oldGlpeCompounder",
      ethereum.Value.fromAddress(_oldGlpeCompounder)
    )
  );
  updateGlpCompoundRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_newGlpCompounder",
      ethereum.Value.fromAddress(_newGlpCompounder)
    )
  );

  return updateGlpCompoundRewardsEvent;
}

export function createUpdateGlpRewardTrackerEvent(
  _oldGlpTracker: Address,
  _newGlpTracker: Address
): UpdateGlpRewardTracker {
  let updateGlpRewardTrackerEvent = changetype<UpdateGlpRewardTracker>(
    newMockEvent()
  );

  updateGlpRewardTrackerEvent.parameters = new Array();

  updateGlpRewardTrackerEvent.parameters.push(
    new ethereum.EventParam(
      "_oldGlpTracker",
      ethereum.Value.fromAddress(_oldGlpTracker)
    )
  );
  updateGlpRewardTrackerEvent.parameters.push(
    new ethereum.EventParam(
      "_newGlpTracker",
      ethereum.Value.fromAddress(_newGlpTracker)
    )
  );

  return updateGlpRewardTrackerEvent;
}

export function createUpdateGlpVaultEvent(
  _oldGlpVault: Address,
  _newGlpVault: Address
): UpdateGlpVault {
  let updateGlpVaultEvent = changetype<UpdateGlpVault>(newMockEvent());

  updateGlpVaultEvent.parameters = new Array();

  updateGlpVaultEvent.parameters.push(
    new ethereum.EventParam(
      "_oldGlpVault",
      ethereum.Value.fromAddress(_oldGlpVault)
    )
  );
  updateGlpVaultEvent.parameters.push(
    new ethereum.EventParam(
      "_newGlpVault",
      ethereum.Value.fromAddress(_newGlpVault)
    )
  );

  return updateGlpVaultEvent;
}

export function createUpdateIncentiveReceiverEvent(
  _oldIncentiveReceiver: Address,
  _newIncentiveReceiver: Address
): UpdateIncentiveReceiver {
  let updateIncentiveReceiverEvent = changetype<UpdateIncentiveReceiver>(
    newMockEvent()
  );

  updateIncentiveReceiverEvent.parameters = new Array();

  updateIncentiveReceiverEvent.parameters.push(
    new ethereum.EventParam(
      "_oldIncentiveReceiver",
      ethereum.Value.fromAddress(_oldIncentiveReceiver)
    )
  );
  updateIncentiveReceiverEvent.parameters.push(
    new ethereum.EventParam(
      "_newIncentiveReceiver",
      ethereum.Value.fromAddress(_newIncentiveReceiver)
    )
  );

  return updateIncentiveReceiverEvent;
}

export function createUpdateStableAddressEvent(
  _oldStableAddress: Address,
  _newStableAddress: Address
): UpdateStableAddress {
  let updateStableAddressEvent = changetype<UpdateStableAddress>(
    newMockEvent()
  );

  updateStableAddressEvent.parameters = new Array();

  updateStableAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_oldStableAddress",
      ethereum.Value.fromAddress(_oldStableAddress)
    )
  );
  updateStableAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_newStableAddress",
      ethereum.Value.fromAddress(_newStableAddress)
    )
  );

  return updateStableAddressEvent;
}

export function createUpdateStableCompoundRewardsEvent(
  _oldStableCompounder: Address,
  _newStableCompounder: Address
): UpdateStableCompoundRewards {
  let updateStableCompoundRewardsEvent = changetype<
    UpdateStableCompoundRewards
  >(newMockEvent());

  updateStableCompoundRewardsEvent.parameters = new Array();

  updateStableCompoundRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_oldStableCompounder",
      ethereum.Value.fromAddress(_oldStableCompounder)
    )
  );
  updateStableCompoundRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_newStableCompounder",
      ethereum.Value.fromAddress(_newStableCompounder)
    )
  );

  return updateStableCompoundRewardsEvent;
}

export function createUpdateStableRewardTrackerEvent(
  _oldStableTracker: Address,
  _newStableTracker: Address
): UpdateStableRewardTracker {
  let updateStableRewardTrackerEvent = changetype<UpdateStableRewardTracker>(
    newMockEvent()
  );

  updateStableRewardTrackerEvent.parameters = new Array();

  updateStableRewardTrackerEvent.parameters.push(
    new ethereum.EventParam(
      "_oldStableTracker",
      ethereum.Value.fromAddress(_oldStableTracker)
    )
  );
  updateStableRewardTrackerEvent.parameters.push(
    new ethereum.EventParam(
      "_newStableTracker",
      ethereum.Value.fromAddress(_newStableTracker)
    )
  );

  return updateStableRewardTrackerEvent;
}

export function createUpdateStableVaultEvent(
  _oldStableVault: Address,
  _newStableVault: Address
): UpdateStableVault {
  let updateStableVaultEvent = changetype<UpdateStableVault>(newMockEvent());

  updateStableVaultEvent.parameters = new Array();

  updateStableVaultEvent.parameters.push(
    new ethereum.EventParam(
      "_oldStableVault",
      ethereum.Value.fromAddress(_oldStableVault)
    )
  );
  updateStableVaultEvent.parameters.push(
    new ethereum.EventParam(
      "_newStableVault",
      ethereum.Value.fromAddress(_newStableVault)
    )
  );

  return updateStableVaultEvent;
}

export function createUpdateWithdrawalRetentionEvent(
  _newRetention: BigInt
): UpdateWithdrawalRetention {
  let updateWithdrawalRetentionEvent = changetype<UpdateWithdrawalRetention>(
    newMockEvent()
  );

  updateWithdrawalRetentionEvent.parameters = new Array();

  updateWithdrawalRetentionEvent.parameters.push(
    new ethereum.EventParam(
      "_newRetention",
      ethereum.Value.fromUnsignedBigInt(_newRetention)
    )
  );

  return updateWithdrawalRetentionEvent;
}

export function createVaultDepositEvent(
  vault: Address,
  _amount: BigInt,
  _retention: BigInt
): VaultDeposit {
  let vaultDepositEvent = changetype<VaultDeposit>(newMockEvent());

  vaultDepositEvent.parameters = new Array();

  vaultDepositEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  );
  vaultDepositEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );
  vaultDepositEvent.parameters.push(
    new ethereum.EventParam(
      "_retention",
      ethereum.Value.fromUnsignedBigInt(_retention)
    )
  );

  return vaultDepositEvent;
}

export function createunCompoundGlpEvent(
  _to: Address,
  _amount: BigInt
): unCompoundGlp {
  let unCompoundGlpEvent = changetype<unCompoundGlp>(newMockEvent());

  unCompoundGlpEvent.parameters = new Array();

  unCompoundGlpEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  unCompoundGlpEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );

  return unCompoundGlpEvent;
}

export function createunCompoundStablesEvent(
  _to: Address,
  _amount: BigInt
): unCompoundStables {
  let unCompoundStablesEvent = changetype<unCompoundStables>(newMockEvent());

  unCompoundStablesEvent.parameters = new Array();

  unCompoundStablesEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  );
  unCompoundStablesEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  );

  return unCompoundStablesEvent;
}
