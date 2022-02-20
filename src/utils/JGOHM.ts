import { getGOHMDecimals } from "./GOHM";
import { JGOHMGOHM_SUSHI_PAIR } from "./../constants";
import { UniswapV2Pair } from "./../../generated/JonesETHVaultV1/UniswapV2Pair";
import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";

export const getJGOHMDecimals = (): number => {
  return 18; //https://arbiscan.io/address/0x662d0f9ff837a51cf89a1fe7e0882a906dac08a3#readContract
};

export const getJGOHMToETHRatio = (): BigDecimal => {
  // grabs the WETH price from the WETHUSDC pool and then multiplies by the JGOHMWETH price (ratio)
  const pairContract = UniswapV2Pair.bind(Address.fromString(JGOHMGOHM_SUSHI_PAIR));

  const result = pairContract.try_getReserves();
  if (result.reverted) {
    return BigDecimal.fromString("0");
  }

  const reserve0 = result.value.value0; // JGOHM
  const reserve1 = result.value.value1; // GOHM

  const totJGOHM = toDecimal(reserve0, getJGOHMDecimals());
  const totGOHM = toDecimal(reserve1, getGOHMDecimals());

  const JGOHMToGOHMRatio = totGOHM.div(totJGOHM);
  return JGOHMToGOHMRatio;
};
