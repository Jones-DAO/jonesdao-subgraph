import { DpxCustomPriceOracle } from "./../../generated/JonesETHVaultV2/DpxCustomPriceOracle";
import { RDPX_ORACLE } from "./../constants";
import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";
import { getDPXUSDPrice } from "./DPX";

export function getRDPXDecimals(): number {
  return 18;
}

export function getRDPXUSDPrice(): BigDecimal {
  // use the dopex oracle
  const oracle = DpxCustomPriceOracle.bind(Address.fromString(RDPX_ORACLE));
  return toDecimal(oracle.getPriceInUSD(), 8); // oracle decimals is 8
}

// Converts an amount of rDPX to DPX
export function rDPXToDPX(rdpx: BigDecimal): BigDecimal {
  const usdAmount = rdpx.times(getRDPXUSDPrice());
  const dpxUSDPrice = getDPXUSDPrice();
  return usdAmount.div(dpxUSDPrice);
}
