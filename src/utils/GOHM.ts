import { ArbEthSSOVV2 } from "./../../generated/JonesGOHMVaultV2/ArbEthSSOVV2";
import { BigDecimal } from "@graphprotocol/graph-ts";
import { GOHM_SSOVC_V2 } from "./../constants";
import { Address } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";

export const getGOHMDecimals = (): number => {
  return 18; //https://arbiscan.io/token/0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1
};

// Read the USD price from the GOHM-USDC univ2 pair
export const getGOHMPrice = (): BigDecimal => {
  // use the dopex oracle
  const ssov = ArbEthSSOVV2.bind(Address.fromString(GOHM_SSOVC_V2));
  return toDecimal(ssov.getUsdPrice(), 8); // oracle decimals is 8
};
