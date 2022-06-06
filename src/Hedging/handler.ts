import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";
import { HedgingStrategyState } from "../../generated/schema";
import { loadOrCreateHedgingStrategyStateMetric } from "./metric";
import {
  getBalanceOf,
  getAssetPriceInOtherAsset,
  getEarningsFromDopexFarm,
  ZERO
} from "../helpers";
import { ERC20 } from "../../generated/JonesETHVaultV1/ERC20";
import { toDecimal } from "../utils/Decimals";
import { UniswapV2Pair } from "../../generated/JonesETHVaultV1/UniswapV2Pair";
import {
  DPXWETH_SUSHI_PAIR,
  RDPXWETH_SUSHI_PAIR,
  DPX_FARM,
  DPXWETH_FARM,
  RDPXWETH_FARM
} from "../constants";

export function updateAndGetHedgingStrategyState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  hedgingStrategyAddress: string,
  blockNumber: BigInt
): HedgingStrategyState | null {
  if (blockNumber.lt(BigInt.fromString("13519691"))) return null;

  const metric = loadOrCreateHedgingStrategyStateMetric(timestamp, dateStr, asset);

  const tokens = ["DPX", "RDPX", "WETH", "GOHM", "USDC", "WBTC"];

  // Cummulative value denominated in `asset` of 'loose' token holdings
  let tokenHoldingsValueInAsset = ZERO;
  for (let i = 0; i < tokens.length; i++) {
    const balance = getBalanceOf(tokens[i], hedgingStrategyAddress);

    const priceInAsset = getAssetPriceInOtherAsset(tokens[i], asset);

    if (balance.notEqual(ZERO)) {
      tokenHoldingsValueInAsset = tokenHoldingsValueInAsset.plus(balance.times(priceInAsset));
    }
  }

  const dpxWethFarmingData = getEarningsFromDopexFarm(hedgingStrategyAddress, DPXWETH_FARM, asset);
  const dpxWethLpTokenAmount = dpxWethFarmingData[0];
  const dpxWethRewardAmount = dpxWethFarmingData[0];

  const rdpxWethFarmingData = getEarningsFromDopexFarm(
    hedgingStrategyAddress,
    RDPXWETH_FARM,
    asset
  );
  const rdpxWethLpTokenAmount = rdpxWethFarmingData[0];
  const rdpxWethRewardAmount = rdpxWethFarmingData[0];

  const dpxWethLpValueInAsset = getLpValueInAsset(
    hedgingStrategyAddress,
    asset,
    DPXWETH_SUSHI_PAIR,
    dpxWethLpTokenAmount,
    dpxWethRewardAmount,
    "DPX"
  );

  const rdpxWethLpValueInAsset = getLpValueInAsset(
    hedgingStrategyAddress,
    asset,
    RDPXWETH_SUSHI_PAIR,
    rdpxWethLpTokenAmount,
    rdpxWethRewardAmount,
    "RDPX"
  );

  // Cummulative value denominated in `asset` of all LP token holdings and
  // LP farm deposits + rewards
  const lpValueInAsset = dpxWethLpValueInAsset.plus(rdpxWethLpValueInAsset);

  // DPX farm deposits + reward, if `asset` is DPX
  let totalDpxFarmAmount = ZERO;
  if (asset === "DPX") {
    const dpxFarmingData = getEarningsFromDopexFarm(hedgingStrategyAddress, DPX_FARM, asset);

    const dpxFarmingAmount = dpxFarmingData[0];
    const dpxRewardAmount = dpxFarmingData[0];

    totalDpxFarmAmount = dpxFarmingAmount.plus(dpxRewardAmount);
  }

  metric.totalUnderlyingValue = tokenHoldingsValueInAsset
    .plus(lpValueInAsset)
    .plus(totalDpxFarmAmount);

  metric.save();

  return metric;
}

const getLpValueInAsset = (
  hedgingStrategyAddress: string,
  asset: string,
  lpToken: string,
  lpTokenAmountInFarm: BigDecimal,
  lpFarmRewardAmount: BigDecimal,
  firstAssetInPair: string
): BigDecimal => {
  const lpContract = ERC20.bind(Address.fromString(lpToken));
  const strategyLpTokenBalance = toDecimal(
    lpContract.balanceOf(Address.fromString(hedgingStrategyAddress)),
    18
  ).plus(lpTokenAmountInFarm);

  if (strategyLpTokenBalance.notEqual(ZERO)) {
    const lpContract = UniswapV2Pair.bind(Address.fromString(DPXWETH_SUSHI_PAIR));

    const reservesData = lpContract.getReserves();
    const firstAssetLpReserves = reservesData.value0;
    const wethLpReserves = reservesData.value1;

    const strategyPercentOfLp = strategyLpTokenBalance.div(toDecimal(lpContract.totalSupply(), 18));

    const firstAssetValueInAsset = toDecimal(firstAssetLpReserves, 18)
      .times(strategyPercentOfLp)
      .times(getAssetPriceInOtherAsset(firstAssetInPair, asset));

    const wethValueInAsset = toDecimal(wethLpReserves, 18)
      .times(strategyPercentOfLp)
      .times(getAssetPriceInOtherAsset("WETH", asset));

    return firstAssetValueInAsset.plus(wethValueInAsset).plus(lpFarmRewardAmount);
  }

  return ZERO;
};
