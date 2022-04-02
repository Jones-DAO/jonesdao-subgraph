import { Curve2PoolSsovPut } from "./../generated/Curve2PoolSsovPutGOHM/Curve2PoolSsovPut";
import { ERC20 } from "./../generated/JonesETHVaultV1/ERC20";
import { UniswapV2Pair } from "./../generated/JonesETHVaultV1/UniswapV2Pair";
import { ArbEthSSOVV2 } from "./../generated/ETHSSOV/ArbEthSSOVV2";
import { Address, bigDecimal, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import {
  JONES_DPX_VAULT_V2,
  JONES_ETH_VAULT_V2,
  JONES_GOHM_VAULT_V2,
  ETH_SSOVC_V2,
  DPX_SSOVC_V2,
  JONES_ETH_STARTBLOCK,
  JONES_GOHM_STARTBLOCK,
  JONES_DPX_STARTBLOCK,
  GOHM_SSOVC_V2,
  JETHETH_SUSHI_PAIR,
  JGOHMGOHM_SUSHI_PAIR,
  DPXJDPX_SUSHI_PAIR,
  GOHM,
  DPX,
  ETH_SSOVP_V2,
  GOHM_SSOVP_V2,
  DPX_SSOVP_V2
} from "./constants";
import { toDecimal } from "./utils/Decimals";
import { loadOrCreateETHBalanceMetric } from "./JonesVaults/ETHVaultV2/ETHVaultBalanceMetric";
import { JonesArbETHVaultV2 } from "../generated/JonesETHVaultV2/JonesArbETHVaultV2";

// NOTE before reading!
// AssemblyScript / subgraph TS is extremely restrictive. These if statements are the only thing you can do really.
// NOT even switch statements work. Can't do any magic typescript stuff either to just get properties smoothly. f

export const assetToJonesVaultV2 = (asset: string): string => {
  if (asset === "ETH") {
    return JONES_ETH_VAULT_V2;
  } else if (asset === "GOHM") {
    return JONES_GOHM_VAULT_V2;
  } else if (asset === "DPX") {
    return JONES_DPX_VAULT_V2;
  } else {
    return "";
  }
};

export const assetToTokenAddr = (asset: string): string => {
  if (asset === "GOHM") {
    return GOHM;
  } else if (asset === "DPX") {
    return DPX;
  } else {
    return "";
  }
};

export const assetToDecimals = (asset: string): number => {
  if (asset === "ETH") {
    return 18;
  } else if (asset === "GOHM") {
    return 18;
  } else if (asset === "DPX") {
    return 18;
  } else {
    return 1;
  }
};

export const assetToJAssetLP = (asset: string): string => {
  if (asset === "ETH") {
    return JETHETH_SUSHI_PAIR;
  } else if (asset === "GOHM") {
    return JGOHMGOHM_SUSHI_PAIR;
  } else if (asset === "DPX") {
    return DPXJDPX_SUSHI_PAIR;
  } else {
    return "";
  }
};

export const assetToSSOVC = (asset: string): string => {
  if (asset === "ETH") {
    return ETH_SSOVC_V2;
  } else if (asset === "GOHM") {
    return GOHM_SSOVC_V2;
  } else if (asset === "DPX") {
    return DPX_SSOVC_V2;
  } else {
    return "";
  }
};

export const assetToSSOVP = (asset: string): string => {
  if (asset === "ETH") {
    return ETH_SSOVP_V2;
  } else if (asset === "GOHM") {
    return GOHM_SSOVP_V2;
  } else if (asset === "DPX") {
    return DPX_SSOVP_V2;
  } else {
    return "";
  }
};

// not really used right now
export const assetToStartBlock = (asset: string): BigInt => {
  let block = "";
  if (asset === "ETH") {
    block = JONES_ETH_STARTBLOCK;
  } else if (asset === "GOHM") {
    block = JONES_GOHM_STARTBLOCK;
  } else if (asset === "DPX") {
    block = JONES_DPX_STARTBLOCK;
  } else {
    block = JONES_ETH_STARTBLOCK;
  }

  return BigInt.fromString(block);
};

export const shouldReadAsset = (asset: string, block: BigInt): boolean => {
  const assetStartBlock = assetToStartBlock(asset);
  const ok = block.ge(assetStartBlock);
  return ok;
};

export const getAssetPriceFromSSOVC = (asset: string): BigDecimal => {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const maybePrice = ssov.try_getUsdPrice();
  if (maybePrice.reverted) {
    return BigDecimal.fromString("0");
  } else {
    return toDecimal(maybePrice.value, 8);
  }
};

export const getAssetPriceFromSSOVP = (asset: string): BigDecimal => {
  const ssov = Curve2PoolSsovPut.bind(Address.fromString(assetToSSOVP(asset)));
  const maybePrice = ssov.try_getUsdPrice();
  if (maybePrice.reverted) {
    return BigDecimal.fromString("0");
  } else {
    return toDecimal(maybePrice.value, 8);
  }
};

export const getJAssetRatioFromLP = (asset: string): BigDecimal => {
  const jAssetAssetLP = assetToJAssetLP(asset);
  const decimals = assetToDecimals(asset);

  const jAssetAssetLPFlipped = asset === "DPX";

  const pairContract = UniswapV2Pair.bind(Address.fromString(jAssetAssetLP));

  const result = pairContract.try_getReserves();
  if (result.reverted) {
    return BigDecimal.fromString("0");
  }

  const reserve0 = result.value.value0;
  const reserve1 = result.value.value1;

  let jAssetReserve: BigInt;
  let assetReserve: BigInt;

  if (jAssetAssetLPFlipped) {
    jAssetReserve = reserve1;
    assetReserve = reserve0;
  } else {
    jAssetReserve = reserve0;
    assetReserve = reserve1;
  }

  const totJAsset = toDecimal(jAssetReserve, decimals);
  const totAsset = toDecimal(assetReserve, decimals);

  return totAsset.div(totJAsset);
};

export const bigIntListToBigDecimalList = (list: BigInt[], decimals: number): BigDecimal[] => {
  const newList: BigDecimal[] = [];
  for (let i = 0; i < list.length; i++) {
    newList.push(toDecimal(list[i], decimals));
  }

  return newList;
};

/**
 * Please note that this does not work for ETH.
 * The graph does not read ETH-native data, only contract data.
 * ETH balance is read as a function of all previous deposits and withdrawals.
 * @param asset
 * @returns
 */
export const getVaultBalanceOf = (asset: string): BigDecimal => {
  const vaultAddr = assetToJonesVaultV2(asset);
  const vault = Address.fromString(vaultAddr);

  if (asset === "ETH") {
    // eth is very different since its the native asset and not an erc20
    const ethBalanceMetric = loadOrCreateETHBalanceMetric();
    if (ethBalanceMetric.balance) {
      return ethBalanceMetric.balance;
    } else {
      // no bueno
      return BigDecimal.fromString("0");
    }
  } else {
    const tokenAddr = assetToTokenAddr(asset);
    const token = ERC20.bind(Address.fromString(tokenAddr));
    const vaultBalance = token.balanceOf(vault);
    return toDecimal(vaultBalance, assetToDecimals(asset));
  }
};

// Simply reads the snapshot value of the contract. This is the starting amount for the current epoch.
export const getVaultSnapshotBalanceOf = (asset: string): BigDecimal => {
  const vaultAddr = assetToJonesVaultV2(asset);
  const vault = JonesArbETHVaultV2.bind(Address.fromString(vaultAddr));
  return toDecimal(vault.snapshotVaultBalance(), assetToDecimals(asset));
};

export const sumBigDecimalArray = (arr: BigDecimal[]): BigDecimal => {
  let sum = BigDecimal.fromString("0");
  for (let i = 0; i < arr.length; i++) {
    sum = sum.plus(arr[i]);
  }
  return sum;
};

// When just wanting to modify a value at an index in an array we need to create a brand new array to trigger some change detection thing.
export const plusBigDecimalAtIndex = (
  arr: BigDecimal[],
  index: number,
  other: BigDecimal
): BigDecimal[] => {
  const newArr: BigDecimal[] = [];
  for (let i = 0; i < arr.length; i++) {
    const newValueAtIndex = index === i ? arr[i].plus(other) : arr[i];
    newArr.push(newValueAtIndex);
  }
  return newArr;
};

export const getCombinedEpochID = (ssovcEpoch: BigInt, ssovpEpoch: BigInt): string => {
  return `${ssovcEpoch.toString()}-${ssovpEpoch.toString()}`;
};
