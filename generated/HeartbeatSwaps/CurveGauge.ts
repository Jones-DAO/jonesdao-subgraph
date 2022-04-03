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

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get provider(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get provider(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class CommitOwnership extends ethereum.Event {
  get params(): CommitOwnership__Params {
    return new CommitOwnership__Params(this);
  }
}

export class CommitOwnership__Params {
  _event: CommitOwnership;

  constructor(event: CommitOwnership) {
    this._event = event;
  }

  get admin(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ApplyOwnership extends ethereum.Event {
  get params(): ApplyOwnership__Params {
    return new ApplyOwnership__Params(this);
  }
}

export class ApplyOwnership__Params {
  _event: ApplyOwnership;

  constructor(event: ApplyOwnership) {
    this._event = event;
  }

  get admin(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get _from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get _owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class CurveGauge extends ethereum.SmartContract {
  static bind(address: Address): CurveGauge {
    return new CurveGauge("CurveGauge", address);
  }

  decimals(): BigInt {
    let result = super.call("decimals", "decimals():(uint256)", []);

    return result[0].toBigInt();
  }

  try_decimals(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("decimals", "decimals():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  reward_contract(): Address {
    let result = super.call(
      "reward_contract",
      "reward_contract():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_reward_contract(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "reward_contract",
      "reward_contract():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  last_claim(): BigInt {
    let result = super.call("last_claim", "last_claim():(uint256)", []);

    return result[0].toBigInt();
  }

  try_last_claim(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("last_claim", "last_claim():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimed_reward(_addr: Address, _token: Address): BigInt {
    let result = super.call(
      "claimed_reward",
      "claimed_reward(address,address):(uint256)",
      [ethereum.Value.fromAddress(_addr), ethereum.Value.fromAddress(_token)]
    );

    return result[0].toBigInt();
  }

  try_claimed_reward(
    _addr: Address,
    _token: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimed_reward",
      "claimed_reward(address,address):(uint256)",
      [ethereum.Value.fromAddress(_addr), ethereum.Value.fromAddress(_token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimable_reward(_addr: Address, _token: Address): BigInt {
    let result = super.call(
      "claimable_reward",
      "claimable_reward(address,address):(uint256)",
      [ethereum.Value.fromAddress(_addr), ethereum.Value.fromAddress(_token)]
    );

    return result[0].toBigInt();
  }

  try_claimable_reward(
    _addr: Address,
    _token: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimable_reward",
      "claimable_reward(address,address):(uint256)",
      [ethereum.Value.fromAddress(_addr), ethereum.Value.fromAddress(_token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimable_reward_write(_addr: Address, _token: Address): BigInt {
    let result = super.call(
      "claimable_reward_write",
      "claimable_reward_write(address,address):(uint256)",
      [ethereum.Value.fromAddress(_addr), ethereum.Value.fromAddress(_token)]
    );

    return result[0].toBigInt();
  }

  try_claimable_reward_write(
    _addr: Address,
    _token: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimable_reward_write",
      "claimable_reward_write(address,address):(uint256)",
      [ethereum.Value.fromAddress(_addr), ethereum.Value.fromAddress(_token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transfer(_to: Address, _value: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_to),
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);

    return result[0].toBoolean();
  }

  try_transfer(_to: Address, _value: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_to),
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(_from: Address, _to: Address, _value: BigInt): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_from),
        ethereum.Value.fromAddress(_to),
        ethereum.Value.fromUnsignedBigInt(_value)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    _from: Address,
    _to: Address,
    _value: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_from),
        ethereum.Value.fromAddress(_to),
        ethereum.Value.fromUnsignedBigInt(_value)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  approve(_spender: Address, _value: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_spender),
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);

    return result[0].toBoolean();
  }

  try_approve(_spender: Address, _value: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(_spender),
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  increaseAllowance(_spender: Address, _added_value: BigInt): boolean {
    let result = super.call(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_spender),
        ethereum.Value.fromUnsignedBigInt(_added_value)
      ]
    );

    return result[0].toBoolean();
  }

  try_increaseAllowance(
    _spender: Address,
    _added_value: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_spender),
        ethereum.Value.fromUnsignedBigInt(_added_value)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  decreaseAllowance(_spender: Address, _subtracted_value: BigInt): boolean {
    let result = super.call(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_spender),
        ethereum.Value.fromUnsignedBigInt(_subtracted_value)
      ]
    );

    return result[0].toBoolean();
  }

  try_decreaseAllowance(
    _spender: Address,
    _subtracted_value: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_spender),
        ethereum.Value.fromUnsignedBigInt(_subtracted_value)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lp_token(): Address {
    let result = super.call("lp_token", "lp_token():(address)", []);

    return result[0].toAddress();
  }

  try_lp_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("lp_token", "lp_token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  balanceOf(arg0: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(arg0)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(arg0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(arg0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  allowance(arg0: Address, arg1: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(arg0), ethereum.Value.fromAddress(arg1)]
    );

    return result[0].toBigInt();
  }

  try_allowance(arg0: Address, arg1: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(arg0), ethereum.Value.fromAddress(arg1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  reward_tokens(arg0: BigInt): Address {
    let result = super.call(
      "reward_tokens",
      "reward_tokens(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(arg0)]
    );

    return result[0].toAddress();
  }

  try_reward_tokens(arg0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "reward_tokens",
      "reward_tokens(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(arg0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  reward_balances(arg0: Address): BigInt {
    let result = super.call(
      "reward_balances",
      "reward_balances(address):(uint256)",
      [ethereum.Value.fromAddress(arg0)]
    );

    return result[0].toBigInt();
  }

  try_reward_balances(arg0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "reward_balances",
      "reward_balances(address):(uint256)",
      [ethereum.Value.fromAddress(arg0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewards_receiver(arg0: Address): Address {
    let result = super.call(
      "rewards_receiver",
      "rewards_receiver(address):(address)",
      [ethereum.Value.fromAddress(arg0)]
    );

    return result[0].toAddress();
  }

  try_rewards_receiver(arg0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "rewards_receiver",
      "rewards_receiver(address):(address)",
      [ethereum.Value.fromAddress(arg0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  claim_sig(): Bytes {
    let result = super.call("claim_sig", "claim_sig():(bytes)", []);

    return result[0].toBytes();
  }

  try_claim_sig(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("claim_sig", "claim_sig():(bytes)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  reward_integral(arg0: Address): BigInt {
    let result = super.call(
      "reward_integral",
      "reward_integral(address):(uint256)",
      [ethereum.Value.fromAddress(arg0)]
    );

    return result[0].toBigInt();
  }

  try_reward_integral(arg0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "reward_integral",
      "reward_integral(address):(uint256)",
      [ethereum.Value.fromAddress(arg0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  reward_integral_for(arg0: Address, arg1: Address): BigInt {
    let result = super.call(
      "reward_integral_for",
      "reward_integral_for(address,address):(uint256)",
      [ethereum.Value.fromAddress(arg0), ethereum.Value.fromAddress(arg1)]
    );

    return result[0].toBigInt();
  }

  try_reward_integral_for(
    arg0: Address,
    arg1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "reward_integral_for",
      "reward_integral_for(address,address):(uint256)",
      [ethereum.Value.fromAddress(arg0), ethereum.Value.fromAddress(arg1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  admin(): Address {
    let result = super.call("admin", "admin():(address)", []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("admin", "admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  future_admin(): Address {
    let result = super.call("future_admin", "future_admin():(address)", []);

    return result[0].toAddress();
  }

  try_future_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("future_admin", "future_admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

  get _admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _lp_token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class Claimable_reward_writeCall extends ethereum.Call {
  get inputs(): Claimable_reward_writeCall__Inputs {
    return new Claimable_reward_writeCall__Inputs(this);
  }

  get outputs(): Claimable_reward_writeCall__Outputs {
    return new Claimable_reward_writeCall__Outputs(this);
  }
}

export class Claimable_reward_writeCall__Inputs {
  _call: Claimable_reward_writeCall;

  constructor(call: Claimable_reward_writeCall) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class Claimable_reward_writeCall__Outputs {
  _call: Claimable_reward_writeCall;

  constructor(call: Claimable_reward_writeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class Set_rewards_receiverCall extends ethereum.Call {
  get inputs(): Set_rewards_receiverCall__Inputs {
    return new Set_rewards_receiverCall__Inputs(this);
  }

  get outputs(): Set_rewards_receiverCall__Outputs {
    return new Set_rewards_receiverCall__Outputs(this);
  }
}

export class Set_rewards_receiverCall__Inputs {
  _call: Set_rewards_receiverCall;

  constructor(call: Set_rewards_receiverCall) {
    this._call = call;
  }

  get _receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class Set_rewards_receiverCall__Outputs {
  _call: Set_rewards_receiverCall;

  constructor(call: Set_rewards_receiverCall) {
    this._call = call;
  }
}

export class Claim_rewardsCall extends ethereum.Call {
  get inputs(): Claim_rewardsCall__Inputs {
    return new Claim_rewardsCall__Inputs(this);
  }

  get outputs(): Claim_rewardsCall__Outputs {
    return new Claim_rewardsCall__Outputs(this);
  }
}

export class Claim_rewardsCall__Inputs {
  _call: Claim_rewardsCall;

  constructor(call: Claim_rewardsCall) {
    this._call = call;
  }
}

export class Claim_rewardsCall__Outputs {
  _call: Claim_rewardsCall;

  constructor(call: Claim_rewardsCall) {
    this._call = call;
  }
}

export class Claim_rewards1Call extends ethereum.Call {
  get inputs(): Claim_rewards1Call__Inputs {
    return new Claim_rewards1Call__Inputs(this);
  }

  get outputs(): Claim_rewards1Call__Outputs {
    return new Claim_rewards1Call__Outputs(this);
  }
}

export class Claim_rewards1Call__Inputs {
  _call: Claim_rewards1Call;

  constructor(call: Claim_rewards1Call) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class Claim_rewards1Call__Outputs {
  _call: Claim_rewards1Call;

  constructor(call: Claim_rewards1Call) {
    this._call = call;
  }
}

export class Claim_rewards2Call extends ethereum.Call {
  get inputs(): Claim_rewards2Call__Inputs {
    return new Claim_rewards2Call__Inputs(this);
  }

  get outputs(): Claim_rewards2Call__Outputs {
    return new Claim_rewards2Call__Outputs(this);
  }
}

export class Claim_rewards2Call__Inputs {
  _call: Claim_rewards2Call;

  constructor(call: Claim_rewards2Call) {
    this._call = call;
  }

  get _addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _receiver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class Claim_rewards2Call__Outputs {
  _call: Claim_rewards2Call;

  constructor(call: Claim_rewards2Call) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _value(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class Deposit1Call extends ethereum.Call {
  get inputs(): Deposit1Call__Inputs {
    return new Deposit1Call__Inputs(this);
  }

  get outputs(): Deposit1Call__Outputs {
    return new Deposit1Call__Outputs(this);
  }
}

export class Deposit1Call__Inputs {
  _call: Deposit1Call;

  constructor(call: Deposit1Call) {
    this._call = call;
  }

  get _value(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _addr(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class Deposit1Call__Outputs {
  _call: Deposit1Call;

  constructor(call: Deposit1Call) {
    this._call = call;
  }
}

export class Deposit2Call extends ethereum.Call {
  get inputs(): Deposit2Call__Inputs {
    return new Deposit2Call__Inputs(this);
  }

  get outputs(): Deposit2Call__Outputs {
    return new Deposit2Call__Outputs(this);
  }
}

export class Deposit2Call__Inputs {
  _call: Deposit2Call;

  constructor(call: Deposit2Call) {
    this._call = call;
  }

  get _value(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _addr(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _claim_rewards(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class Deposit2Call__Outputs {
  _call: Deposit2Call;

  constructor(call: Deposit2Call) {
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

  get _value(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class Withdraw1Call extends ethereum.Call {
  get inputs(): Withdraw1Call__Inputs {
    return new Withdraw1Call__Inputs(this);
  }

  get outputs(): Withdraw1Call__Outputs {
    return new Withdraw1Call__Outputs(this);
  }
}

export class Withdraw1Call__Inputs {
  _call: Withdraw1Call;

  constructor(call: Withdraw1Call) {
    this._call = call;
  }

  get _value(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _claim_rewards(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class Withdraw1Call__Outputs {
  _call: Withdraw1Call;

  constructor(call: Withdraw1Call) {
    this._call = call;
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get _from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _value(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get _spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class IncreaseAllowanceCall extends ethereum.Call {
  get inputs(): IncreaseAllowanceCall__Inputs {
    return new IncreaseAllowanceCall__Inputs(this);
  }

  get outputs(): IncreaseAllowanceCall__Outputs {
    return new IncreaseAllowanceCall__Outputs(this);
  }
}

export class IncreaseAllowanceCall__Inputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get _spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _added_value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseAllowanceCall__Outputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DecreaseAllowanceCall extends ethereum.Call {
  get inputs(): DecreaseAllowanceCall__Inputs {
    return new DecreaseAllowanceCall__Inputs(this);
  }

  get outputs(): DecreaseAllowanceCall__Outputs {
    return new DecreaseAllowanceCall__Outputs(this);
  }
}

export class DecreaseAllowanceCall__Inputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get _spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _subtracted_value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseAllowanceCall__Outputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class Set_rewardsCall extends ethereum.Call {
  get inputs(): Set_rewardsCall__Inputs {
    return new Set_rewardsCall__Inputs(this);
  }

  get outputs(): Set_rewardsCall__Outputs {
    return new Set_rewardsCall__Outputs(this);
  }
}

export class Set_rewardsCall__Inputs {
  _call: Set_rewardsCall;

  constructor(call: Set_rewardsCall) {
    this._call = call;
  }

  get _reward_contract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _claim_sig(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get _reward_tokens(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }
}

export class Set_rewardsCall__Outputs {
  _call: Set_rewardsCall;

  constructor(call: Set_rewardsCall) {
    this._call = call;
  }
}

export class Commit_transfer_ownershipCall extends ethereum.Call {
  get inputs(): Commit_transfer_ownershipCall__Inputs {
    return new Commit_transfer_ownershipCall__Inputs(this);
  }

  get outputs(): Commit_transfer_ownershipCall__Outputs {
    return new Commit_transfer_ownershipCall__Outputs(this);
  }
}

export class Commit_transfer_ownershipCall__Inputs {
  _call: Commit_transfer_ownershipCall;

  constructor(call: Commit_transfer_ownershipCall) {
    this._call = call;
  }

  get addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class Commit_transfer_ownershipCall__Outputs {
  _call: Commit_transfer_ownershipCall;

  constructor(call: Commit_transfer_ownershipCall) {
    this._call = call;
  }
}

export class Accept_transfer_ownershipCall extends ethereum.Call {
  get inputs(): Accept_transfer_ownershipCall__Inputs {
    return new Accept_transfer_ownershipCall__Inputs(this);
  }

  get outputs(): Accept_transfer_ownershipCall__Outputs {
    return new Accept_transfer_ownershipCall__Outputs(this);
  }
}

export class Accept_transfer_ownershipCall__Inputs {
  _call: Accept_transfer_ownershipCall;

  constructor(call: Accept_transfer_ownershipCall) {
    this._call = call;
  }
}

export class Accept_transfer_ownershipCall__Outputs {
  _call: Accept_transfer_ownershipCall;

  constructor(call: Accept_transfer_ownershipCall) {
    this._call = call;
  }
}
