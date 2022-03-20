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

export class JAssetMetric extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("JAssetToAssetRatio", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("JAssetPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("AssetPrice", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save JAssetMetric entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save JAssetMetric entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("JAssetMetric", id.toString(), this);
    }
  }

  static load(id: string): JAssetMetric | null {
    return changetype<JAssetMetric | null>(store.get("JAssetMetric", id));
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

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get JAssetToAssetRatio(): BigDecimal {
    let value = this.get("JAssetToAssetRatio");
    return value!.toBigDecimal();
  }

  set JAssetToAssetRatio(value: BigDecimal) {
    this.set("JAssetToAssetRatio", Value.fromBigDecimal(value));
  }

  get JAssetPrice(): BigDecimal {
    let value = this.get("JAssetPrice");
    return value!.toBigDecimal();
  }

  set JAssetPrice(value: BigDecimal) {
    this.set("JAssetPrice", Value.fromBigDecimal(value));
  }

  get AssetPrice(): BigDecimal {
    let value = this.get("AssetPrice");
    return value!.toBigDecimal();
  }

  set AssetPrice(value: BigDecimal) {
    this.set("AssetPrice", Value.fromBigDecimal(value));
  }
}

export class SSOVCallDeposit extends Entity {
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
    assert(id != null, "Cannot save SSOVCallDeposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVCallDeposit entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVCallDeposit", id.toString(), this);
    }
  }

  static load(id: string): SSOVCallDeposit | null {
    return changetype<SSOVCallDeposit | null>(store.get("SSOVCallDeposit", id));
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

export class SSOVPutDeposit extends Entity {
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
    assert(id != null, "Cannot save SSOVPutDeposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVPutDeposit entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVPutDeposit", id.toString(), this);
    }
  }

  static load(id: string): SSOVPutDeposit | null {
    return changetype<SSOVPutDeposit | null>(store.get("SSOVPutDeposit", id));
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

export class SSOVCallDepositsState extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("strikes", Value.fromBigDecimalArray(new Array(0)));
    this.set("ownership", Value.fromBigDecimalArray(new Array(0)));
    this.set("totalDeposits", Value.fromBigDecimalArray(new Array(0)));
    this.set("summedTotalDeposits", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("summedUserDeposits", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("summedOwnership", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalFarmRewards", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("userFarmRewards", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("userDeposits", Value.fromBigDecimalArray(new Array(0)));
    this.set("totalPremiums", Value.fromBigDecimalArray(new Array(0)));
    this.set("userPremiums", Value.fromBigDecimalArray(new Array(0)));
    this.set("assetPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("user", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save SSOVCallDepositsState entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVCallDepositsState entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVCallDepositsState", id.toString(), this);
    }
  }

  static load(id: string): SSOVCallDepositsState | null {
    return changetype<SSOVCallDepositsState | null>(
      store.get("SSOVCallDepositsState", id)
    );
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

  get strikes(): Array<BigDecimal> {
    let value = this.get("strikes");
    return value!.toBigDecimalArray();
  }

  set strikes(value: Array<BigDecimal>) {
    this.set("strikes", Value.fromBigDecimalArray(value));
  }

  get ownership(): Array<BigDecimal> {
    let value = this.get("ownership");
    return value!.toBigDecimalArray();
  }

  set ownership(value: Array<BigDecimal>) {
    this.set("ownership", Value.fromBigDecimalArray(value));
  }

  get totalDeposits(): Array<BigDecimal> {
    let value = this.get("totalDeposits");
    return value!.toBigDecimalArray();
  }

  set totalDeposits(value: Array<BigDecimal>) {
    this.set("totalDeposits", Value.fromBigDecimalArray(value));
  }

  get summedTotalDeposits(): BigDecimal {
    let value = this.get("summedTotalDeposits");
    return value!.toBigDecimal();
  }

  set summedTotalDeposits(value: BigDecimal) {
    this.set("summedTotalDeposits", Value.fromBigDecimal(value));
  }

  get summedUserDeposits(): BigDecimal {
    let value = this.get("summedUserDeposits");
    return value!.toBigDecimal();
  }

  set summedUserDeposits(value: BigDecimal) {
    this.set("summedUserDeposits", Value.fromBigDecimal(value));
  }

  get summedOwnership(): BigDecimal {
    let value = this.get("summedOwnership");
    return value!.toBigDecimal();
  }

  set summedOwnership(value: BigDecimal) {
    this.set("summedOwnership", Value.fromBigDecimal(value));
  }

  get totalFarmRewards(): BigDecimal {
    let value = this.get("totalFarmRewards");
    return value!.toBigDecimal();
  }

  set totalFarmRewards(value: BigDecimal) {
    this.set("totalFarmRewards", Value.fromBigDecimal(value));
  }

  get userFarmRewards(): BigDecimal {
    let value = this.get("userFarmRewards");
    return value!.toBigDecimal();
  }

  set userFarmRewards(value: BigDecimal) {
    this.set("userFarmRewards", Value.fromBigDecimal(value));
  }

  get userDeposits(): Array<BigDecimal> {
    let value = this.get("userDeposits");
    return value!.toBigDecimalArray();
  }

  set userDeposits(value: Array<BigDecimal>) {
    this.set("userDeposits", Value.fromBigDecimalArray(value));
  }

  get totalPremiums(): Array<BigDecimal> {
    let value = this.get("totalPremiums");
    return value!.toBigDecimalArray();
  }

  set totalPremiums(value: Array<BigDecimal>) {
    this.set("totalPremiums", Value.fromBigDecimalArray(value));
  }

  get userPremiums(): Array<BigDecimal> {
    let value = this.get("userPremiums");
    return value!.toBigDecimalArray();
  }

  set userPremiums(value: Array<BigDecimal>) {
    this.set("userPremiums", Value.fromBigDecimalArray(value));
  }

  get assetPrice(): BigDecimal {
    let value = this.get("assetPrice");
    return value!.toBigDecimal();
  }

  set assetPrice(value: BigDecimal) {
    this.set("assetPrice", Value.fromBigDecimal(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }
}

export class SSOVCallPurchase extends Entity {
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
    assert(id != null, "Cannot save SSOVCallPurchase entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVCallPurchase entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVCallPurchase", id.toString(), this);
    }
  }

  static load(id: string): SSOVCallPurchase | null {
    return changetype<SSOVCallPurchase | null>(
      store.get("SSOVCallPurchase", id)
    );
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

export class SSOVPutPurchase extends Entity {
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
    assert(id != null, "Cannot save SSOVPutPurchase entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVPutPurchase entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVPutPurchase", id.toString(), this);
    }
  }

  static load(id: string): SSOVPutPurchase | null {
    return changetype<SSOVPutPurchase | null>(store.get("SSOVPutPurchase", id));
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

export class SSOVCallPurchasesState extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("strikes", Value.fromBigDecimalArray(new Array(0)));
    this.set("callsPurchased", Value.fromBigDecimalArray(new Array(0)));
    this.set("premiumsPaid", Value.fromBigDecimalArray(new Array(0)));
    this.set("feesPaid", Value.fromBigDecimalArray(new Array(0)));
    this.set("costToExercise", Value.fromBigDecimalArray(new Array(0)));
    this.set("assetPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("user", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save SSOVCallPurchasesState entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SSOVCallPurchasesState entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SSOVCallPurchasesState", id.toString(), this);
    }
  }

  static load(id: string): SSOVCallPurchasesState | null {
    return changetype<SSOVCallPurchasesState | null>(
      store.get("SSOVCallPurchasesState", id)
    );
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

  get strikes(): Array<BigDecimal> {
    let value = this.get("strikes");
    return value!.toBigDecimalArray();
  }

  set strikes(value: Array<BigDecimal>) {
    this.set("strikes", Value.fromBigDecimalArray(value));
  }

  get callsPurchased(): Array<BigDecimal> {
    let value = this.get("callsPurchased");
    return value!.toBigDecimalArray();
  }

  set callsPurchased(value: Array<BigDecimal>) {
    this.set("callsPurchased", Value.fromBigDecimalArray(value));
  }

  get premiumsPaid(): Array<BigDecimal> {
    let value = this.get("premiumsPaid");
    return value!.toBigDecimalArray();
  }

  set premiumsPaid(value: Array<BigDecimal>) {
    this.set("premiumsPaid", Value.fromBigDecimalArray(value));
  }

  get feesPaid(): Array<BigDecimal> {
    let value = this.get("feesPaid");
    return value!.toBigDecimalArray();
  }

  set feesPaid(value: Array<BigDecimal>) {
    this.set("feesPaid", Value.fromBigDecimalArray(value));
  }

  get costToExercise(): Array<BigDecimal> {
    let value = this.get("costToExercise");
    return value!.toBigDecimalArray();
  }

  set costToExercise(value: Array<BigDecimal>) {
    this.set("costToExercise", Value.fromBigDecimalArray(value));
  }

  get assetPrice(): BigDecimal {
    let value = this.get("assetPrice");
    return value!.toBigDecimal();
  }

  set assetPrice(value: BigDecimal) {
    this.set("assetPrice", Value.fromBigDecimal(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }
}

export class Heartbeat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Heartbeat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Heartbeat entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Heartbeat", id.toString(), this);
    }
  }

  static load(id: string): Heartbeat | null {
    return changetype<Heartbeat | null>(store.get("Heartbeat", id));
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
}

export class ETHBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("balance", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ETHBalance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ETHBalance entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ETHBalance", id.toString(), this);
    }
  }

  static load(id: string): ETHBalance | null {
    return changetype<ETHBalance | null>(store.get("ETHBalance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balance(): BigDecimal {
    let value = this.get("balance");
    return value!.toBigDecimal();
  }

  set balance(value: BigDecimal) {
    this.set("balance", Value.fromBigDecimal(value));
  }
}

export class JonesVaultPnL extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("pnlPercentage", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("pnlUnderlying", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalAssetsDeposited", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("depositPnl", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("purchasePnl", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalAssetsFarming", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("farmPnl", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("epochStartingAssets", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("unallocatedAssets", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("currentAssetsWithPnl", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save JonesVaultPnL entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save JonesVaultPnL entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("JonesVaultPnL", id.toString(), this);
    }
  }

  static load(id: string): JonesVaultPnL | null {
    return changetype<JonesVaultPnL | null>(store.get("JonesVaultPnL", id));
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

  get pnlPercentage(): BigDecimal {
    let value = this.get("pnlPercentage");
    return value!.toBigDecimal();
  }

  set pnlPercentage(value: BigDecimal) {
    this.set("pnlPercentage", Value.fromBigDecimal(value));
  }

  get pnlUnderlying(): BigDecimal {
    let value = this.get("pnlUnderlying");
    return value!.toBigDecimal();
  }

  set pnlUnderlying(value: BigDecimal) {
    this.set("pnlUnderlying", Value.fromBigDecimal(value));
  }

  get totalAssetsDeposited(): BigDecimal {
    let value = this.get("totalAssetsDeposited");
    return value!.toBigDecimal();
  }

  set totalAssetsDeposited(value: BigDecimal) {
    this.set("totalAssetsDeposited", Value.fromBigDecimal(value));
  }

  get depositPnl(): BigDecimal {
    let value = this.get("depositPnl");
    return value!.toBigDecimal();
  }

  set depositPnl(value: BigDecimal) {
    this.set("depositPnl", Value.fromBigDecimal(value));
  }

  get purchasePnl(): BigDecimal {
    let value = this.get("purchasePnl");
    return value!.toBigDecimal();
  }

  set purchasePnl(value: BigDecimal) {
    this.set("purchasePnl", Value.fromBigDecimal(value));
  }

  get totalAssetsFarming(): BigDecimal {
    let value = this.get("totalAssetsFarming");
    return value!.toBigDecimal();
  }

  set totalAssetsFarming(value: BigDecimal) {
    this.set("totalAssetsFarming", Value.fromBigDecimal(value));
  }

  get farmPnl(): BigDecimal {
    let value = this.get("farmPnl");
    return value!.toBigDecimal();
  }

  set farmPnl(value: BigDecimal) {
    this.set("farmPnl", Value.fromBigDecimal(value));
  }

  get epochStartingAssets(): BigDecimal {
    let value = this.get("epochStartingAssets");
    return value!.toBigDecimal();
  }

  set epochStartingAssets(value: BigDecimal) {
    this.set("epochStartingAssets", Value.fromBigDecimal(value));
  }

  get unallocatedAssets(): BigDecimal {
    let value = this.get("unallocatedAssets");
    return value!.toBigDecimal();
  }

  set unallocatedAssets(value: BigDecimal) {
    this.set("unallocatedAssets", Value.fromBigDecimal(value));
  }

  get currentAssetsWithPnl(): BigDecimal {
    let value = this.get("currentAssetsWithPnl");
    return value!.toBigDecimal();
  }

  set currentAssetsWithPnl(value: BigDecimal) {
    this.set("currentAssetsWithPnl", Value.fromBigDecimal(value));
  }
}

export class JonesSSOVCallPurchase extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("strikeIndex", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("premium", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalFee", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save JonesSSOVCallPurchase entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save JonesSSOVCallPurchase entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("JonesSSOVCallPurchase", id.toString(), this);
    }
  }

  static load(id: string): JonesSSOVCallPurchase | null {
    return changetype<JonesSSOVCallPurchase | null>(
      store.get("JonesSSOVCallPurchase", id)
    );
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

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value!.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get strikeIndex(): BigInt {
    let value = this.get("strikeIndex");
    return value!.toBigInt();
  }

  set strikeIndex(value: BigInt) {
    this.set("strikeIndex", Value.fromBigInt(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value!.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get premium(): BigDecimal {
    let value = this.get("premium");
    return value!.toBigDecimal();
  }

  set premium(value: BigDecimal) {
    this.set("premium", Value.fromBigDecimal(value));
  }

  get totalFee(): BigDecimal {
    let value = this.get("totalFee");
    return value!.toBigDecimal();
  }

  set totalFee(value: BigDecimal) {
    this.set("totalFee", Value.fromBigDecimal(value));
  }
}

export class SummedJonesSSOVCallPurchases extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("asset", Value.fromString(""));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("strikes", Value.fromBigIntArray(new Array(0)));
    this.set("callsPurchased", Value.fromBigDecimalArray(new Array(0)));
    this.set("premiumsPaid", Value.fromBigDecimalArray(new Array(0)));
    this.set("feesPaid", Value.fromBigDecimalArray(new Array(0)));
    this.set("costToExercise", Value.fromBigDecimalArray(new Array(0)));
    this.set("totalPremiumsPaid", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalFeesPaid", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalCostToExercise", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save SummedJonesSSOVCallPurchases entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SummedJonesSSOVCallPurchases entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SummedJonesSSOVCallPurchases", id.toString(), this);
    }
  }

  static load(id: string): SummedJonesSSOVCallPurchases | null {
    return changetype<SummedJonesSSOVCallPurchases | null>(
      store.get("SummedJonesSSOVCallPurchases", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value!.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get strikes(): Array<BigInt> {
    let value = this.get("strikes");
    return value!.toBigIntArray();
  }

  set strikes(value: Array<BigInt>) {
    this.set("strikes", Value.fromBigIntArray(value));
  }

  get callsPurchased(): Array<BigDecimal> {
    let value = this.get("callsPurchased");
    return value!.toBigDecimalArray();
  }

  set callsPurchased(value: Array<BigDecimal>) {
    this.set("callsPurchased", Value.fromBigDecimalArray(value));
  }

  get premiumsPaid(): Array<BigDecimal> {
    let value = this.get("premiumsPaid");
    return value!.toBigDecimalArray();
  }

  set premiumsPaid(value: Array<BigDecimal>) {
    this.set("premiumsPaid", Value.fromBigDecimalArray(value));
  }

  get feesPaid(): Array<BigDecimal> {
    let value = this.get("feesPaid");
    return value!.toBigDecimalArray();
  }

  set feesPaid(value: Array<BigDecimal>) {
    this.set("feesPaid", Value.fromBigDecimalArray(value));
  }

  get costToExercise(): Array<BigDecimal> {
    let value = this.get("costToExercise");
    return value!.toBigDecimalArray();
  }

  set costToExercise(value: Array<BigDecimal>) {
    this.set("costToExercise", Value.fromBigDecimalArray(value));
  }

  get totalPremiumsPaid(): BigDecimal {
    let value = this.get("totalPremiumsPaid");
    return value!.toBigDecimal();
  }

  set totalPremiumsPaid(value: BigDecimal) {
    this.set("totalPremiumsPaid", Value.fromBigDecimal(value));
  }

  get totalFeesPaid(): BigDecimal {
    let value = this.get("totalFeesPaid");
    return value!.toBigDecimal();
  }

  set totalFeesPaid(value: BigDecimal) {
    this.set("totalFeesPaid", Value.fromBigDecimal(value));
  }

  get totalCostToExercise(): BigDecimal {
    let value = this.get("totalCostToExercise");
    return value!.toBigDecimal();
  }

  set totalCostToExercise(value: BigDecimal) {
    this.set("totalCostToExercise", Value.fromBigDecimal(value));
  }
}

export class JonesSSOVCallDeposit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("strikeIndex", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save JonesSSOVCallDeposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save JonesSSOVCallDeposit entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("JonesSSOVCallDeposit", id.toString(), this);
    }
  }

  static load(id: string): JonesSSOVCallDeposit | null {
    return changetype<JonesSSOVCallDeposit | null>(
      store.get("JonesSSOVCallDeposit", id)
    );
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

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value!.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get strikeIndex(): BigInt {
    let value = this.get("strikeIndex");
    return value!.toBigInt();
  }

  set strikeIndex(value: BigInt) {
    this.set("strikeIndex", Value.fromBigInt(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value!.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }
}

export class JonesEpochStarted extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("asset", Value.fromString(""));
    this.set("epoch", Value.fromBigInt(BigInt.zero()));
    this.set("amount", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("jAssetAmount", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save JonesEpochStarted entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save JonesEpochStarted entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("JonesEpochStarted", id.toString(), this);
    }
  }

  static load(id: string): JonesEpochStarted | null {
    return changetype<JonesEpochStarted | null>(
      store.get("JonesEpochStarted", id)
    );
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

  get asset(): string {
    let value = this.get("asset");
    return value!.toString();
  }

  set asset(value: string) {
    this.set("asset", Value.fromString(value));
  }

  get epoch(): BigInt {
    let value = this.get("epoch");
    return value!.toBigInt();
  }

  set epoch(value: BigInt) {
    this.set("epoch", Value.fromBigInt(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value!.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get jAssetAmount(): BigDecimal {
    let value = this.get("jAssetAmount");
    return value!.toBigDecimal();
  }

  set jAssetAmount(value: BigDecimal) {
    this.set("jAssetAmount", Value.fromBigDecimal(value));
  }
}
