import { getWETHDecimals, getWETHPrice } from "./WETH";
import { UniswapV2Pair } from "./../../generated/JonesETHVaultV1/UniswapV2Pair";
import { BigDecimal, log } from "@graphprotocol/graph-ts";
import { WETHGOHM_SUSHI_PAIR } from "./../constants";
import { Address } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";

export const getGOHMDecimals = (): number => {
  return 18; //https://arbiscan.io/token/0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1
};

// Read the USD price from the GOHM-USDC univ2 pair
export const getGOHMPrice = (): BigDecimal => {
  const pairContract = UniswapV2Pair.bind(Address.fromString(WETHGOHM_SUSHI_PAIR));

  const result = pairContract.try_getReserves();

  if (result.reverted) {
    return BigDecimal.fromString("0");
  }

  const reserve0 = result.value.value0; // WETH
  const reserve1 = result.value.value1; // GOHM

  const totWETH = toDecimal(reserve0, getWETHDecimals());
  const totGOHM = toDecimal(reserve1, getGOHMDecimals());

  const GOHMToWETHRate = totWETH.div(totGOHM);

  return GOHMToWETHRate.times(getWETHPrice());
};
