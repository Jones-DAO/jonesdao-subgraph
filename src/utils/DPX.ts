import { DPX_SSOV_V2 } from "./../constants";
import { ArbEthSSOVV2 } from "./../../generated/ETHSSOV/ArbEthSSOVV2";
import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";

export function getDPXDecimals(): number {
  return 18;
}

export function getDPXUSDPrice(): BigDecimal {
  // use the dopex oracle
  const ssov = ArbEthSSOVV2.bind(Address.fromString(DPX_SSOV_V2));
  return toDecimal(ssov.getUsdPrice(), 8); // oracle decimals is 8
}
