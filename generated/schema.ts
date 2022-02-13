// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class JETHMetric extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("JETHToETHRatio", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("JETHUSDPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("ETHUSDPrice", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save JETHMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save JETHMetric entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("JETHMetric", id.toString(), this);
    }
  }

  static load(id: string): JETHMetric | null {
    return changetype<JETHMetric | null>(store.get("JETHMetric", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get JETHToETHRatio(): BigDecimal {
    let value = this.get("JETHToETHRatio");
    return value!.toBigDecimal();
  }

  set JETHToETHRatio(value: BigDecimal) {
    this.set("JETHToETHRatio", Value.fromBigDecimal(value));
  }

  get JETHUSDPrice(): BigDecimal {
    let value = this.get("JETHUSDPrice");
    return value!.toBigDecimal();
  }

  set JETHUSDPrice(value: BigDecimal) {
    this.set("JETHUSDPrice", Value.fromBigDecimal(value));
  }

  get ETHUSDPrice(): BigDecimal {
    let value = this.get("ETHUSDPrice");
    return value!.toBigDecimal();
  }

  set ETHUSDPrice(value: BigDecimal) {
    this.set("ETHUSDPrice", Value.fromBigDecimal(value));
  }
}

export class JGOHMMetric extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("JGOHMToGOHMRatio", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("JGOHMUSDPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("GOHMUSDPrice", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save JGOHMMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save JGOHMMetric entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("JGOHMMetric", id.toString(), this);
    }
  }

  static load(id: string): JGOHMMetric | null {
    return changetype<JGOHMMetric | null>(store.get("JGOHMMetric", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get JGOHMToGOHMRatio(): BigDecimal {
    let value = this.get("JGOHMToGOHMRatio");
    return value!.toBigDecimal();
  }

  set JGOHMToGOHMRatio(value: BigDecimal) {
    this.set("JGOHMToGOHMRatio", Value.fromBigDecimal(value));
  }

  get JGOHMUSDPrice(): BigDecimal {
    let value = this.get("JGOHMUSDPrice");
    return value!.toBigDecimal();
  }

  set JGOHMUSDPrice(value: BigDecimal) {
    this.set("JGOHMUSDPrice", Value.fromBigDecimal(value));
  }

  get GOHMUSDPrice(): BigDecimal {
    let value = this.get("GOHMUSDPrice");
    return value!.toBigDecimal();
  }

  set GOHMUSDPrice(value: BigDecimal) {
    this.set("GOHMUSDPrice", Value.fromBigDecimal(value));
  }
}

export class SSOVDeposit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("strike", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("user", Value.fromBytes(Bytes.empty()));
    this.set("sender", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SSOVDeposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVDeposit entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVDeposit", id.toString(), this);
    }
  }

  static load(id: string): SSOVDeposit | null {
    return changetype<SSOVDeposit | null>(store.get("SSOVDeposit", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value!.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get strike(): BigInt {
    let value = this.get("strike");
    return value!.toBigInt();
  }

  set strike(value: BigInt) {
    this.set("strike", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    return value!.toBytes();
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value!.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }
}

export class SSOVPurchase extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("strike", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("fee", Value.fromBigInt(BigInt.zero()));
    this.set("premium", Value.fromBigInt(BigInt.zero()));
    this.set("user", Value.fromBytes(Bytes.empty()));
    this.set("sender", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SSOVPurchase entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVPurchase entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVPurchase", id.toString(), this);
    }
  }

  static load(id: string): SSOVPurchase | null {
    return changetype<SSOVPurchase | null>(store.get("SSOVPurchase", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value!.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get strike(): BigInt {
    let value = this.get("strike");
    return value!.toBigInt();
  }

  set strike(value: BigInt) {
    this.set("strike", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    return value!.toBigInt();
  }

  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }

  get premium(): BigInt {
    let value = this.get("premium");
    return value!.toBigInt();
  }

  set premium(value: BigInt) {
    this.set("premium", Value.fromBigInt(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    return value!.toBytes();
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value!.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }
}

export class SSOVState extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("strikes", Value.fromBigIntArray(new Array(0)));
    this.set("callsPurchased", Value.fromBigIntArray(new Array(0)));
    this.set("premiumsPaid", Value.fromBigIntArray(new Array(0)));
    this.set("deposits", Value.fromBigIntArray(new Array(0)));
    this.set("user", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SSOVState entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVState entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVState", id.toString(), this);
    }
  }

  static load(id: string): SSOVState | null {
    return changetype<SSOVState | null>(store.get("SSOVState", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value!.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get strikes(): Array<BigInt> {
    let value = this.get("strikes");
    return value!.toBigIntArray();
  }

  set strikes(value: Array<BigInt>) {
    this.set("strikes", Value.fromBigIntArray(value));
  }

  get callsPurchased(): Array<BigInt> {
    let value = this.get("callsPurchased");
    return value!.toBigIntArray();
  }

  set callsPurchased(value: Array<BigInt>) {
    this.set("callsPurchased", Value.fromBigIntArray(value));
  }

  get premiumsPaid(): Array<BigInt> {
    let value = this.get("premiumsPaid");
    return value!.toBigIntArray();
  }

  set premiumsPaid(value: Array<BigInt>) {
    this.set("premiumsPaid", Value.fromBigIntArray(value));
  }

  get deposits(): Array<BigInt> {
    let value = this.get("deposits");
    return value!.toBigIntArray();
  }

  set deposits(value: Array<BigInt>) {
    this.set("deposits", Value.fromBigIntArray(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }
}
