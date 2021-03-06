// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AddToContractWhitelist extends ethereum.Event {
  get params(): AddToContractWhitelist__Params {
    return new AddToContractWhitelist__Params(this);
  }
}

export class AddToContractWhitelist__Params {
  _event: AddToContractWhitelist;

  constructor(event: AddToContractWhitelist) {
    this._event = event;
  }

  get _contract(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RemoveFromContractWhitelist extends ethereum.Event {
  get params(): RemoveFromContractWhitelist__Params {
    return new RemoveFromContractWhitelist__Params(this);
  }
}

export class RemoveFromContractWhitelist__Params {
  _event: RemoveFromContractWhitelist;

  constructor(event: RemoveFromContractWhitelist) {
    this._event = event;
  }

  get _contract(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RewardAdded extends ethereum.Event {
  get params(): RewardAdded__Params {
    return new RewardAdded__Params(this);
  }
}

export class RewardAdded__Params {
  _event: RewardAdded;

  constructor(event: RewardAdded) {
    this._event = event;
  }

  get rewardDPX(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get rewardRDPX(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RewardCompounded extends ethereum.Event {
  get params(): RewardCompounded__Params {
    return new RewardCompounded__Params(this);
  }
}

export class RewardCompounded__Params {
  _event: RewardCompounded;

  constructor(event: RewardCompounded) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get rewardDPX(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RewardPaid extends ethereum.Event {
  get params(): RewardPaid__Params {
    return new RewardPaid__Params(this);
  }
}

export class RewardPaid__Params {
  _event: RewardPaid;

  constructor(event: RewardPaid) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get reward(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RewardUpdated extends ethereum.Event {
  get params(): RewardUpdated__Params {
    return new RewardUpdated__Params(this);
  }
}

export class RewardUpdated__Params {
  _event: RewardUpdated;

  constructor(event: RewardUpdated) {
    this._event = event;
  }

  get rewardDPX(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get rewardRDPX(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Staked extends ethereum.Event {
  get params(): Staked__Params {
    return new Staked__Params(this);
  }
}

export class Staked__Params {
  _event: Staked;

  constructor(event: Staked) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Withdrawn extends ethereum.Event {
  get params(): Withdrawn__Params {
    return new Withdrawn__Params(this);
  }
}

export class Withdrawn__Params {
  _event: Withdrawn;

  constructor(event: Withdrawn) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class StakingRewards__earnedResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class StakingRewards__rewardPerTokenResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class StakingRewards__withdrawRewardTokensResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class StakingRewards extends ethereum.SmartContract {
  static bind(address: Address): StakingRewards {
    return new StakingRewards("StakingRewards", address);
  }

  addToContractWhitelist(_contract: Address): boolean {
    let result = super.call(
      "addToContractWhitelist",
      "addToContractWhitelist(address):(bool)",
      [ethereum.Value.fromAddress(_contract)]
    );

    return result[0].toBoolean();
  }

  try_addToContractWhitelist(_contract: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "addToContractWhitelist",
      "addToContractWhitelist(address):(bool)",
      [ethereum.Value.fromAddress(_contract)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(account: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  boost(): BigInt {
    let result = super.call("boost", "boost():(uint256)", []);

    return result[0].toBigInt();
  }

  try_boost(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("boost", "boost():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  boostedFinish(): BigInt {
    let result = super.call("boostedFinish", "boostedFinish():(uint256)", []);

    return result[0].toBigInt();
  }

  try_boostedFinish(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "boostedFinish",
      "boostedFinish():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  boostedTimePeriod(): BigInt {
    let result = super.call(
      "boostedTimePeriod",
      "boostedTimePeriod():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_boostedTimePeriod(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "boostedTimePeriod",
      "boostedTimePeriod():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  earned(account: Address): StakingRewards__earnedResult {
    let result = super.call("earned", "earned(address):(uint256,uint256)", [
      ethereum.Value.fromAddress(account)
    ]);

    return new StakingRewards__earnedResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_earned(
    account: Address
  ): ethereum.CallResult<StakingRewards__earnedResult> {
    let result = super.tryCall("earned", "earned(address):(uint256,uint256)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new StakingRewards__earnedResult(value[0].toBigInt(), value[1].toBigInt())
    );
  }

  id(): BigInt {
    let result = super.call("id", "id():(uint256)", []);

    return result[0].toBigInt();
  }

  try_id(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("id", "id():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isContract(addr: Address): boolean {
    let result = super.call("isContract", "isContract(address):(bool)", [
      ethereum.Value.fromAddress(addr)
    ]);

    return result[0].toBoolean();
  }

  try_isContract(addr: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isContract", "isContract(address):(bool)", [
      ethereum.Value.fromAddress(addr)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lastTimeRewardApplicable(): BigInt {
    let result = super.call(
      "lastTimeRewardApplicable",
      "lastTimeRewardApplicable():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_lastTimeRewardApplicable(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastTimeRewardApplicable",
      "lastTimeRewardApplicable():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastUpdateTime(): BigInt {
    let result = super.call("lastUpdateTime", "lastUpdateTime():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lastUpdateTime(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastUpdateTime",
      "lastUpdateTime():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  periodFinish(): BigInt {
    let result = super.call("periodFinish", "periodFinish():(uint256)", []);

    return result[0].toBigInt();
  }

  try_periodFinish(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("periodFinish", "periodFinish():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  removeFromContractWhitelist(_contract: Address): boolean {
    let result = super.call(
      "removeFromContractWhitelist",
      "removeFromContractWhitelist(address):(bool)",
      [ethereum.Value.fromAddress(_contract)]
    );

    return result[0].toBoolean();
  }

  try_removeFromContractWhitelist(
    _contract: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "removeFromContractWhitelist",
      "removeFromContractWhitelist(address):(bool)",
      [ethereum.Value.fromAddress(_contract)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  rewardPerToken(): StakingRewards__rewardPerTokenResult {
    let result = super.call(
      "rewardPerToken",
      "rewardPerToken():(uint256,uint256)",
      []
    );

    return new StakingRewards__rewardPerTokenResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_rewardPerToken(): ethereum.CallResult<
    StakingRewards__rewardPerTokenResult
  > {
    let result = super.tryCall(
      "rewardPerToken",
      "rewardPerToken():(uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new StakingRewards__rewardPerTokenResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  rewardPerTokenStoredDPX(): BigInt {
    let result = super.call(
      "rewardPerTokenStoredDPX",
      "rewardPerTokenStoredDPX():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_rewardPerTokenStoredDPX(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardPerTokenStoredDPX",
      "rewardPerTokenStoredDPX():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardPerTokenStoredRDPX(): BigInt {
    let result = super.call(
      "rewardPerTokenStoredRDPX",
      "rewardPerTokenStoredRDPX():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_rewardPerTokenStoredRDPX(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardPerTokenStoredRDPX",
      "rewardPerTokenStoredRDPX():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardRateDPX(): BigInt {
    let result = super.call("rewardRateDPX", "rewardRateDPX():(uint256)", []);

    return result[0].toBigInt();
  }

  try_rewardRateDPX(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardRateDPX",
      "rewardRateDPX():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardRateRDPX(): BigInt {
    let result = super.call("rewardRateRDPX", "rewardRateRDPX():(uint256)", []);

    return result[0].toBigInt();
  }

  try_rewardRateRDPX(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardRateRDPX",
      "rewardRateRDPX():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardsDPX(param0: Address): BigInt {
    let result = super.call("rewardsDPX", "rewardsDPX(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_rewardsDPX(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("rewardsDPX", "rewardsDPX(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardsDistribution(): Address {
    let result = super.call(
      "rewardsDistribution",
      "rewardsDistribution():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_rewardsDistribution(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "rewardsDistribution",
      "rewardsDistribution():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewardsDuration(): BigInt {
    let result = super.call(
      "rewardsDuration",
      "rewardsDuration():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_rewardsDuration(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardsDuration",
      "rewardsDuration():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardsRDPX(param0: Address): BigInt {
    let result = super.call("rewardsRDPX", "rewardsRDPX(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_rewardsRDPX(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardsRDPX",
      "rewardsRDPX(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardsTokenDPX(): Address {
    let result = super.call(
      "rewardsTokenDPX",
      "rewardsTokenDPX():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_rewardsTokenDPX(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "rewardsTokenDPX",
      "rewardsTokenDPX():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewardsTokenRDPX(): Address {
    let result = super.call(
      "rewardsTokenRDPX",
      "rewardsTokenRDPX():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_rewardsTokenRDPX(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "rewardsTokenRDPX",
      "rewardsTokenRDPX():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  stakingToken(): Address {
    let result = super.call("stakingToken", "stakingToken():(address)", []);

    return result[0].toAddress();
  }

  try_stakingToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("stakingToken", "stakingToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userDPXRewardPerTokenPaid(param0: Address): BigInt {
    let result = super.call(
      "userDPXRewardPerTokenPaid",
      "userDPXRewardPerTokenPaid(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_userDPXRewardPerTokenPaid(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userDPXRewardPerTokenPaid",
      "userDPXRewardPerTokenPaid(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userRDPXRewardPerTokenPaid(param0: Address): BigInt {
    let result = super.call(
      "userRDPXRewardPerTokenPaid",
      "userRDPXRewardPerTokenPaid(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_userRDPXRewardPerTokenPaid(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userRDPXRewardPerTokenPaid",
      "userRDPXRewardPerTokenPaid(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  whitelistedContracts(param0: Address): boolean {
    let result = super.call(
      "whitelistedContracts",
      "whitelistedContracts(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_whitelistedContracts(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "whitelistedContracts",
      "whitelistedContracts(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  withdrawRewardTokens(
    amountDPX: BigInt,
    amountRDPX: BigInt
  ): StakingRewards__withdrawRewardTokensResult {
    let result = super.call(
      "withdrawRewardTokens",
      "withdrawRewardTokens(uint256,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(amountDPX),
        ethereum.Value.fromUnsignedBigInt(amountRDPX)
      ]
    );

    return new StakingRewards__withdrawRewardTokensResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_withdrawRewardTokens(
    amountDPX: BigInt,
    amountRDPX: BigInt
  ): ethereum.CallResult<StakingRewards__withdrawRewardTokensResult> {
    let result = super.tryCall(
      "withdrawRewardTokens",
      "withdrawRewardTokens(uint256,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(amountDPX),
        ethereum.Value.fromUnsignedBigInt(amountRDPX)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new StakingRewards__withdrawRewardTokensResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _rewardsDistribution(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _rewardsTokenDPX(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _rewardsTokenRDPX(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _stakingToken(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _rewardsDuration(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _boostedTimePeriod(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _boost(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get _id(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddToContractWhitelistCall extends ethereum.Call {
  get inputs(): AddToContractWhitelistCall__Inputs {
    return new AddToContractWhitelistCall__Inputs(this);
  }

  get outputs(): AddToContractWhitelistCall__Outputs {
    return new AddToContractWhitelistCall__Outputs(this);
  }
}

export class AddToContractWhitelistCall__Inputs {
  _call: AddToContractWhitelistCall;

  constructor(call: AddToContractWhitelistCall) {
    this._call = call;
  }

  get _contract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddToContractWhitelistCall__Outputs {
  _call: AddToContractWhitelistCall;

  constructor(call: AddToContractWhitelistCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class CompoundCall extends ethereum.Call {
  get inputs(): CompoundCall__Inputs {
    return new CompoundCall__Inputs(this);
  }

  get outputs(): CompoundCall__Outputs {
    return new CompoundCall__Outputs(this);
  }
}

export class CompoundCall__Inputs {
  _call: CompoundCall;

  constructor(call: CompoundCall) {
    this._call = call;
  }
}

export class CompoundCall__Outputs {
  _call: CompoundCall;

  constructor(call: CompoundCall) {
    this._call = call;
  }
}

export class ExitCall extends ethereum.Call {
  get inputs(): ExitCall__Inputs {
    return new ExitCall__Inputs(this);
  }

  get outputs(): ExitCall__Outputs {
    return new ExitCall__Outputs(this);
  }
}

export class ExitCall__Inputs {
  _call: ExitCall;

  constructor(call: ExitCall) {
    this._call = call;
  }
}

export class ExitCall__Outputs {
  _call: ExitCall;

  constructor(call: ExitCall) {
    this._call = call;
  }
}

export class GetRewardCall extends ethereum.Call {
  get inputs(): GetRewardCall__Inputs {
    return new GetRewardCall__Inputs(this);
  }

  get outputs(): GetRewardCall__Outputs {
    return new GetRewardCall__Outputs(this);
  }
}

export class GetRewardCall__Inputs {
  _call: GetRewardCall;

  constructor(call: GetRewardCall) {
    this._call = call;
  }

  get rewardsTokenID(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class GetRewardCall__Outputs {
  _call: GetRewardCall;

  constructor(call: GetRewardCall) {
    this._call = call;
  }
}

export class NotifyRewardAmountCall extends ethereum.Call {
  get inputs(): NotifyRewardAmountCall__Inputs {
    return new NotifyRewardAmountCall__Inputs(this);
  }

  get outputs(): NotifyRewardAmountCall__Outputs {
    return new NotifyRewardAmountCall__Outputs(this);
  }
}

export class NotifyRewardAmountCall__Inputs {
  _call: NotifyRewardAmountCall;

  constructor(call: NotifyRewardAmountCall) {
    this._call = call;
  }

  get rewardDPX(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get rewardRDPX(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class NotifyRewardAmountCall__Outputs {
  _call: NotifyRewardAmountCall;

  constructor(call: NotifyRewardAmountCall) {
    this._call = call;
  }
}

export class RemoveFromContractWhitelistCall extends ethereum.Call {
  get inputs(): RemoveFromContractWhitelistCall__Inputs {
    return new RemoveFromContractWhitelistCall__Inputs(this);
  }

  get outputs(): RemoveFromContractWhitelistCall__Outputs {
    return new RemoveFromContractWhitelistCall__Outputs(this);
  }
}

export class RemoveFromContractWhitelistCall__Inputs {
  _call: RemoveFromContractWhitelistCall;

  constructor(call: RemoveFromContractWhitelistCall) {
    this._call = call;
  }

  get _contract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveFromContractWhitelistCall__Outputs {
  _call: RemoveFromContractWhitelistCall;

  constructor(call: RemoveFromContractWhitelistCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class StakeCall extends ethereum.Call {
  get inputs(): StakeCall__Inputs {
    return new StakeCall__Inputs(this);
  }

  get outputs(): StakeCall__Outputs {
    return new StakeCall__Outputs(this);
  }
}

export class StakeCall__Inputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class StakeCall__Outputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawRewardTokensCall extends ethereum.Call {
  get inputs(): WithdrawRewardTokensCall__Inputs {
    return new WithdrawRewardTokensCall__Inputs(this);
  }

  get outputs(): WithdrawRewardTokensCall__Outputs {
    return new WithdrawRewardTokensCall__Outputs(this);
  }
}

export class WithdrawRewardTokensCall__Inputs {
  _call: WithdrawRewardTokensCall;

  constructor(call: WithdrawRewardTokensCall) {
    this._call = call;
  }

  get amountDPX(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amountRDPX(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawRewardTokensCall__Outputs {
  _call: WithdrawRewardTokensCall;

  constructor(call: WithdrawRewardTokensCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get value1(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}
