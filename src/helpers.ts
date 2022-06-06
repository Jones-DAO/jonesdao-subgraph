import { Curve2PoolSsovPut } from "./../generated/Curve2PoolSsovPutGOHM/Curve2PoolSsovPut";
import { StakingRewards } from "./../generated/JETHETHSwaps/StakingRewards";
import { ERC20 } from "./../generated/JonesETHVaultV1/ERC20";
import { UniswapV2Pair } from "./../generated/JonesETHVaultV1/UniswapV2Pair";
import { JonesERC20VaultV3 } from "./../generated/HeartbeatSwaps/JonesERC20VaultV3";
import { SsovV3 } from "./../generated/HeartbeatSwaps/SsovV3";
import { Address, bigDecimal, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import {
  JONES_DPX_VAULT,
  JONES_WETH_VAULT,
  JONES_GOHM_VAULT,
  JONES_RDPX_VAULT,
  JONES_DPX_CALL_STRATEGY,
  JONES_WETH_CALL_STRATEGY,
  JONES_GOHM_CALL_STRATEGY,
  JONES_RDPX_CALL_STRATEGY,
  JONES_DPX_PUT_STRATEGY,
  JONES_WETH_PUT_STRATEGY,
  JONES_GOHM_PUT_STRATEGY,
  JONES_RDPX_PUT_STRATEGY,
  JONES_WETH_HEDGING_STRATEGY,
  JONES_DPX_HEDGING_STRATEGY,
  JONES_RDPX_HEDGING_STRATEGY,
  WETH_SSOVC,
  DPX_SSOVC,
  GOHM_SSOVC,
  RDPX_SSOVC,
  WETH_SSOVP,
  DPX_SSOVP,
  GOHM_SSOVP,
  RDPX_SSOVP,
  CRV_SSOVP,
  WBTC_SSOVP,
  JETHETH_SUSHI_PAIR,
  JGOHMGOHM_SUSHI_PAIR,
  DPXJDPX_SUSHI_PAIR,
  RDPXJRDPX_SUSHI_PAIR,
  GOHM,
  DPX,
  WETH,
  RDPX,
  CRV,
  CRV2,
  USDC,
  CALL,
  WBTC,
  JONES_GOHM_HEDGING_STRATEGY
} from "./constants";
import { toDecimal } from "./utils/Decimals";

// NOTE before reading!
// AssemblyScript / subgraph TS is extremely restrictive. These if statements are the only thing you can do really.
// NOT even switch statements work. Can't do any magic typescript stuff either to just get properties smoothly. f

export const assetToJonesVault = (asset: string): string => {
  if (asset === "WETH") {
    return JONES_WETH_VAULT;
  } else if (asset === "GOHM") {
    return JONES_GOHM_VAULT;
  } else if (asset === "DPX") {
    return JONES_DPX_VAULT;
  } else if (asset === "RDPX") {
    return JONES_RDPX_VAULT;
  } else {
    return "";
  }
};

export const assetToJonesCallStrategy = (asset: string): string => {
  if (asset === "WETH") {
    return JONES_WETH_CALL_STRATEGY;
  } else if (asset === "GOHM") {
    return JONES_GOHM_CALL_STRATEGY;
  } else if (asset === "DPX") {
    return JONES_DPX_CALL_STRATEGY;
  } else if (asset === "RDPX") {
    return JONES_RDPX_CALL_STRATEGY;
  } else {
    return "";
  }
};

export const assetToJonesPutStrategy = (asset: string): string => {
  if (asset === "WETH") {
    return JONES_WETH_PUT_STRATEGY;
  } else if (asset === "GOHM") {
    return JONES_GOHM_PUT_STRATEGY;
  } else if (asset === "DPX") {
    return JONES_DPX_PUT_STRATEGY;
  } else if (asset === "RDPX") {
    return JONES_RDPX_PUT_STRATEGY;
  } else {
    return "";
  }
};

export const assetToJonesHedgingStrategy = (asset: string): string => {
  if (asset === "WETH") {
    return JONES_WETH_HEDGING_STRATEGY;
  } else if (asset === "GOHM") {
    return JONES_GOHM_HEDGING_STRATEGY;
  } else if (asset === "DPX") {
    return JONES_DPX_HEDGING_STRATEGY;
  } else if (asset === "RDPX") {
    return JONES_RDPX_HEDGING_STRATEGY;
  } else {
    return "";
  }
};

export const assetToTokenAddr = (asset: string): string => {
  if (asset === "WETH") {
    return WETH;
  } else if (asset === "GOHM") {
    return GOHM;
  } else if (asset === "DPX") {
    return DPX;
  } else if (asset === "RDPX") {
    return RDPX;
  } else if (asset === "CRV") {
    return CRV;
  } else if (asset === "2CRV") {
    return CRV2;
  } else if (asset === "USDC") {
    return USDC;
  } else if (asset === "WBTC") {
    return WBTC;
  } else {
    return "";
  }
};

export const assetToDecimals = (asset: string): number => {
  if (asset === "WETH") {
    return 18;
  } else if (asset === "GOHM") {
    return 18;
  } else if (asset === "DPX") {
    return 18;
  } else if (asset === "RDPX") {
    return 18;
  } else if (asset === "2CRV") {
    return 18;
  } else if (asset === "CRV") {
    return 18;
  } else if (asset === "WBTC") {
    return 8;
  } else if (asset === "USDC") {
    return 6;
  } else {
    return 1;
  }
};

export const assetToJAssetLP = (asset: string): string => {
  if (asset === "WETH") {
    return JETHETH_SUSHI_PAIR;
  } else if (asset === "GOHM") {
    return JGOHMGOHM_SUSHI_PAIR;
  } else if (asset === "DPX") {
    return DPXJDPX_SUSHI_PAIR;
  } else if (asset === "RDPX") {
    return RDPXJRDPX_SUSHI_PAIR;
  } else {
    return "";
  }
};

export const tokenAddressToAsset = (tokenAddress: string): string => {
  // The shallow comparison is important here - mysteriously assemblyscript
  // can miss checks here if tokenAddress was converted to a string from
  // type Address
  if (tokenAddress == WETH) {
    return "WETH";
  } else if (tokenAddress == GOHM) {
    return "GOHM";
  } else if (tokenAddress == DPX) {
    return "DPX";
  } else if (tokenAddress == RDPX) {
    return "RDPX";
  } else if (tokenAddress == CRV) {
    return "CRV";
  } else if (tokenAddress == WBTC) {
    return "WBTC";
  } else {
    return "";
  }
};

export const assetToSSOVC = (asset: string): string => {
  if (asset === "WETH") {
    return WETH_SSOVC;
  } else if (asset === "GOHM") {
    return GOHM_SSOVC;
  } else if (asset === "DPX") {
    return DPX_SSOVC;
  } else if (asset === "RDPX") {
    return RDPX_SSOVC;
  } else {
    return "";
  }
};

export const assetToSSOVP = (asset: string): string => {
  if (asset === "WETH") {
    return WETH_SSOVP;
  } else if (asset === "GOHM") {
    return GOHM_SSOVP;
  } else if (asset === "DPX") {
    return DPX_SSOVP;
  } else if (asset === "RDPX") {
    return RDPX_SSOVP;
  } else if (asset === "CRV") {
    return CRV_SSOVP;
  } else if (asset === "WBTC") {
    return WBTC_SSOVP;
  } else {
    return "";
  }
};

export const tokenAddressToSSOVC = (tokenAddress: string): string => {
  return assetToSSOVC(tokenAddressToAsset(tokenAddress));
};

export const tokenAddressToSSOVP = (tokenAddress: string): string => {
  return assetToSSOVP(tokenAddressToAsset(tokenAddress));
};

export const getAssetPriceFromSSOVC = (asset: string): BigDecimal => {
  const ssov = SsovV3.bind(Address.fromString(assetToSSOVC(asset)));
  const maybePrice = ssov.try_getUnderlyingPrice();
  if (maybePrice.reverted) {
    return ZERO;
  } else {
    return toDecimal(maybePrice.value, 8);
  }
};

export const getAssetPriceFromSSOVP = (asset: string): BigDecimal => {
  const ssov = SsovV3.bind(Address.fromString(assetToSSOVP(asset)));
  const maybePrice = ssov.try_getUnderlyingPrice();
  if (maybePrice.reverted) {
    return ZERO;
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
    return ZERO;
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

export const getBalanceOf = (asset: string, ownerAddr: string): BigDecimal => {
  const owner = Address.fromString(ownerAddr);
  const tokenAddr = assetToTokenAddr(asset);
  const token = ERC20.bind(Address.fromString(tokenAddr));
  const balance = token.balanceOf(owner);
  return toDecimal(balance, assetToDecimals(asset));
};

export const getVaultBalanceOf = (asset: string): BigDecimal => {
  const vaultAddr = assetToJonesVault(asset);
  return getBalanceOf(asset, vaultAddr);
};

// Simply reads the snapshot value of the contract. This is the starting amount for the current epoch.
export const getVaultSnapshotBalanceOf = (asset: string): BigDecimal => {
  const vaultAddr = assetToJonesVault(asset);
  const vault = JonesERC20VaultV3.bind(Address.fromString(vaultAddr));
  return toDecimal(vault.snapshotAssetBalance(), assetToDecimals(asset));
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

export const getAssetPrice = (asset: string): BigDecimal => {
  if (asset === "USDC") return BigDecimal.fromString("1");

  const assetPrice =
    asset === "2CRV"
      ? SsovV3.bind(Address.fromString(assetToSSOVP("WETH"))).getCollateralPrice()
      : SsovV3.bind(Address.fromString(assetToSSOVP(asset))).getUnderlyingPrice();

  return toDecimal(assetPrice, 8);
};

export const getAssetPriceInOtherAsset = (
  numeratorAsset: string,
  denominatorAsset: string
): BigDecimal => {
  const numeratorAssetPrice = getAssetPrice(numeratorAsset);
  const denominatorAssetPrice = getAssetPrice(denominatorAsset);

  return numeratorAssetPrice.div(denominatorAssetPrice);
};

export const isCall = (optionType: string): boolean => optionType === CALL;

export const ZERO = BigDecimal.fromString("0");

export const getEarningsFromDopexFarm = (
  userAddress: string,
  farmAddress: string,
  rewardValueDenominatorAsset: string
): BigDecimal[] => {
  const farm = StakingRewards.bind(Address.fromString(farmAddress));
  const user = Address.fromString(userAddress);
  const deposits = toDecimal(farm.balanceOf(user), assetToDecimals("DPX"));
  const earnings = farm.earned(user);
  const dpxEarned = toDecimal(earnings.value0, assetToDecimals("DPX"));
  const rdpxEarned = toDecimal(earnings.value1, assetToDecimals("RDPX"));

  const rdpxUSDValue = rdpxEarned.times(getAssetPriceFromSSOVC("RDPX"));
  const rewardDenominatorUSDPrice = getAssetPriceFromSSOVC(rewardValueDenominatorAsset);
  const totalEarnedInRewardDenominator = dpxEarned.plus(
    rdpxUSDValue.div(rewardDenominatorUSDPrice)
  );

  return [deposits, totalEarnedInRewardDenominator];
};
