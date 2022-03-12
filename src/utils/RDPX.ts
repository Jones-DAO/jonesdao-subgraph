import { RDPX_SSOV_V2 } from "./../constants";
import { ArbEthSSOVV2 } from "./../../generated/ETHSSOV/ArbEthSSOVV2";
import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";
import { getDPXUSDPrice } from "./DPX";

export function getRDPXDecimals(): number {
  return 18;
}

export function getRDPXUSDPrice(): BigDecimal {
  // use the dopex oracle
  const ssov = ArbEthSSOVV2.bind(Address.fromString(RDPX_SSOV_V2));
  return toDecimal(ssov.getUsdPrice(), 8); // oracle decimals is 8
}

// Converts an amount of rDPX to DPX
export function rDPXToDPX(rdpx: BigDecimal): BigDecimal {
  const usdAmount = rdpx.times(getRDPXUSDPrice());
  const dpxUSDPrice = getDPXUSDPrice();
  return usdAmount.div(dpxUSDPrice);
}
