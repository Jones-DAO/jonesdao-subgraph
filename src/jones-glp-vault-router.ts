import { Bytes, bigInt, ethereum } from "@graphprotocol/graph-ts";

import {
  BorrowStables as BorrowStablesEvent,
  ClaimRewards as ClaimRewardsEvent,
  CompoundGlp as CompoundGlpEvent,
  CompoundStables as CompoundStablesEvent,
  DepositGlp as DepositGlpEvent,
  DepositStables as DepositStablesEvent,
  EmergencyPaused as EmergencyPausedEvent,
  EmergencyUnpaused as EmergencyUnpausedEvent,
  EmergencyWithdraw as EmergencyWithdrawEvent,
  GovernorUpdated as GovernorUpdatedEvent,
  Paused as PausedEvent,
  RedeemGlp as RedeemGlpEvent,
  RedeemStable as RedeemStableEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Unpaused as UnpausedEvent,
  VaultDeposit as VaultDepositEvent,
  unCompoundGlp as unCompoundGlpEvent,
  unCompoundStables as unCompoundStablesEvent,
} from "../generated/JonesGlpVaultRouter/JonesGlpVaultRouter";
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
  unCompoundStables,
} from "../generated/schema";

const zapHash = "0xca787aaf";
const redeemGlpBasketHash = "0x17111779";
const zapEthHash = "0xb8e19c11";

const transferEventSignature =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const glpVaultAddress = "0x489ee077994b6658eafa855c308275ead8097c4a";

export function handleBorrowStables(event: BorrowStablesEvent): void {
  let entity = new BorrowStables(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._amountBorrowed = event.params._amountBorrowed;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleClaimRewards(event: ClaimRewardsEvent): void {
  let entity = new ClaimRewards(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._stableAmount = event.params._stableAmount;
  entity._wEthAmount = event.params._wEthAmount;
  entity._amountJones = event.params._amountJones;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCompoundGlp(event: CompoundGlpEvent): void {
  let entity = new CompoundGlp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCompoundStables(event: CompoundStablesEvent): void {
  let entity = new CompoundStables(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDepositGlp(event: DepositGlpEvent): void {
  let entity = new DepositGlp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity._to = event.params._to;
  entity._amount = event.params._amount;
  entity._sharesReceived = event.params._sharesReceived;
  entity._compound = event.params._compound;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;

  const fnHash = event.transaction.input.toHexString().slice(0, 10);

  let zapToGlp = false;
  let zapTokenAddress = "";
  let zapTokenAmount = bigInt.fromString("0");
  let zapToGlpEth = false;
  let zapToGlpEthAmount = bigInt.fromString("0");

  if ([zapHash].includes(fnHash)) {
    zapToGlp = true;
    const inputToHex = event.transaction.input.toHexString();
    const inputWithoutFnHash = inputToHex.slice(10);
    const input = Bytes.fromHexString(inputWithoutFnHash);

    let decoded = ethereum.decode("(address,uint256,bool)", input)!.toTuple();
    zapTokenAddress = decoded[0].toAddress().toHex();
    zapTokenAmount = decoded[1].toBigInt();
  }

  if ([zapEthHash].includes(fnHash)) {
    zapToGlpEth = true;
    zapToGlpEthAmount = event.transaction.value;
  }

  entity.zapToGlp = zapToGlp;
  entity.zapTokenAddress = zapTokenAddress;
  entity.zapTokenAmount = zapTokenAmount;

  entity.zapToGlpEth = zapToGlpEth;
  entity.zapToGlpEthAmount = zapToGlpEthAmount;

  entity.save();
}

export function handleDepositStables(event: DepositStablesEvent): void {
  let entity = new DepositStables(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;
  entity._sharesReceived = event.params._sharesReceived;
  entity._compound = event.params._compound;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEmergencyPaused(event: EmergencyPausedEvent): void {
  let entity = new EmergencyPaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._account = event.params._account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEmergencyUnpaused(event: EmergencyUnpausedEvent): void {
  let entity = new EmergencyUnpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._account = event.params._account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEmergencyWithdraw(event: EmergencyWithdrawEvent): void {
  let entity = new EmergencyWithdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleGovernorUpdated(event: GovernorUpdatedEvent): void {
  let entity = new GovernorUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._oldGovernor = event.params._oldGovernor;
  entity._newGovernor = event.params._newGovernor;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._account = event.params._account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRedeemGlp(event: RedeemGlpEvent): void {
  let entity = new RedeemGlp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;
  entity._retentions = event.params._retentions;
  entity._ethRetentions = event.params._ethRetentions;
  entity._token = event.params._token;
  entity._ethAmount = event.params._ethAmount;
  entity._compound = event.params._compound;
  entity.blockTimestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;

  let redeemGlpBasketAddress = "";
  let redeemGlpBasket = false;
  let redeemGlpNative = false;
  let redeemAmount = bigInt.fromString("0");
  const fnHash = event.transaction.input.toHexString().slice(0, 10);
  if ([redeemGlpBasketHash].includes(fnHash)) {
    redeemGlpBasket = true;

    const inputToHex = event.transaction.input.toHexString();
    const inputWithoutFnHash = inputToHex.slice(10);
    const input = Bytes.fromHexString(inputWithoutFnHash);

    let decoded = ethereum
      .decode("(uint256,bool,address,bool)", input)!
      .toTuple();

    redeemGlpBasketAddress = decoded[2].toAddress().toHex();
    redeemGlpNative = decoded[3].toBoolean();

    const eventReceipt = event.receipt;
    const eventLogs = eventReceipt ? eventReceipt.logs : [];

    const transactionReceiptFiltered = eventLogs.filter(
      (item) =>
        item.topics[0].toHexString().includes(transferEventSignature) &&
        item.topics[1]
          .toHexString()
          .toLowerCase()
          .includes(glpVaultAddress.toLowerCase().slice(2))
    );

    const dataToHex = transactionReceiptFiltered[
      transactionReceiptFiltered.length - 1
    ].data.toHexString();
    entity.transactionTestString = dataToHex;

    redeemAmount = ethereum
      .decode("(uint256)", Bytes.fromHexString(dataToHex))!
      .toTuple()[0]
      .toBigInt();
  }

  entity.redeemGlpBasket = redeemGlpBasket;
  entity.redeemGlpBasketAddress = redeemGlpBasketAddress;
  entity.redeemGlpNative = redeemGlpNative;
  entity.redeemAmount = redeemAmount;

  entity.save();
}

export function handleRedeemStable(event: RedeemStableEvent): void {
  let entity = new RedeemStable(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;
  entity._retentions = event.params._retentions;
  entity._realRetentions = event.params._realRetentions;
  entity._compound = event.params._compound;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.previousAdminRole = event.params.previousAdminRole;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._account = event.params._account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVaultDeposit(event: VaultDepositEvent): void {
  let entity = new VaultDeposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vault = event.params.vault;
  entity._amount = event.params._amount;
  entity._retention = event.params._retention;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleunCompoundGlp(event: unCompoundGlpEvent): void {
  let entity = new unCompoundGlp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleunCompoundStables(event: unCompoundStablesEvent): void {
  let entity = new unCompoundStables(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._to = event.params._to;
  entity._amount = event.params._amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
