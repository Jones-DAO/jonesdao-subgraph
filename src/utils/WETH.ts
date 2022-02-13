import { UniswapV2Pair } from "./../../generated/JonesETHVaultV1/UniswapV2Pair";
import { BigDecimal, log } from "@graphprotocol/graph-ts";
import { WETHUSDC_SUSHI_PAIR } from "./../constants";
import { Address } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";
import { getUSDCDecimals } from "./USDC";

export const getWETHDecimals = (): number => {
  return 18; //https://arbiscan.io/address/0x82af49447d8a07e3bd95bd0d56f35241523fbab1#readProxyContract
};

// Read the USD price from the WETH-USDC univ2 pair
export const getWETHPrice = (): BigDecimal => {
  const pairContract = UniswapV2Pair.bind(Address.fromString(WETHUSDC_SUSHI_PAIR));

  const result = pairContract.try_getReserves();

  if (result.reverted) {
    return BigDecimal.fromString("0");
  }

  const reserve0 = result.value.value0; // weth
  const reserve1 = result.value.value1; // usdc

  const totWETH = toDecimal(reserve0, getWETHDecimals());
  const totUSDC = toDecimal(reserve1, getUSDCDecimals());

  const wethRate = totUSDC.div(totWETH);
  return wethRate;
};
