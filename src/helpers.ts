import { UniswapV2Pair } from "./../generated/JonesETHVaultV1/UniswapV2Pair";
import { ArbEthSSOVV2 } from "./../generated/ETHSSOV/ArbEthSSOVV2";
import { Address, bigDecimal, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import {
  JONES_DPX_VAULT_V2,
  JONES_ETH_VAULT_V2,
  JONES_GOHM_VAULT_V2,
  ETH_SSOV_V2,
  DPX_SSOV_V2,
  JONES_ETH_STARTBLOCK,
  JONES_GOHM_STARTBLOCK,
  JONES_DPX_STARTBLOCK,
  GOHM_SSOV_V2,
  JETHETH_SUSHI_PAIR,
  JGOHMGOHM_SUSHI_PAIR,
  DPXJDPX_SUSHI_PAIR
} from "./constants";
import { toDecimal } from "./utils/Decimals";

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
    return ETH_SSOV_V2;
  } else if (asset === "GOHM") {
    return GOHM_SSOV_V2;
  } else if (asset === "DPX") {
    return DPX_SSOV_V2;
  } else {
    return "";
  }
};

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