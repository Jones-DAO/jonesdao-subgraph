import { JETHETH_SUSHI_PAIR } from "./../constants";
import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { UniswapV2Pair } from "./../../generated/JonesETHVaultV1/UniswapV2Pair";
import { toDecimal } from "./Decimals";
import { getWETHDecimals } from "./WETH";
export const getJETHDecimals = (): number => {
  return 18; //https://arbiscan.io/address/0x662d0f9ff837a51cf89a1fe7e0882a906dac08a3#readContract
};

export const getJETHToETHRatio = (): BigDecimal => {
  // grabs the WETH price from the WETHUSDC pool and then multiplies by the JETHWETH price (ratio)
  const pairContract = UniswapV2Pair.bind(Address.fromString(JETHETH_SUSHI_PAIR));

  const result = pairContract.try_getReserves();
  if (result.reverted) {
    return BigDecimal.fromString("0");
  }

  const reserve0 = result.value.value0; // jeth
  const reserve1 = result.value.value1; // weth

  const totJETH = toDecimal(reserve0, getJETHDecimals());
  const totWETH = toDecimal(reserve1, getWETHDecimals());

  const JETHToWETHRate = totWETH.div(totJETH);
  return JETHToWETHRate;
};
