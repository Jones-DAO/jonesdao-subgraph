import { ArbEthSSOVV2 } from "./../../generated/USDCWETHSwaps/ArbEthSSOVV2";
import { BigDecimal } from "@graphprotocol/graph-ts";
import { ETH_SSOVC_V2 } from "./../constants";
import { Address } from "@graphprotocol/graph-ts";
import { toDecimal } from "./Decimals";

export const getWETHDecimals = (): number => {
  return 18; //https://arbiscan.io/address/0x82af49447d8a07e3bd95bd0d56f35241523fbab1#readProxyContract
};

// Read the USD price from the WETH-USDC univ2 pair
export const getWETHPrice = (): BigDecimal => {
  // use the dopex oracle
  const ssov = ArbEthSSOVV2.bind(Address.fromString(ETH_SSOVC_V2));
  return toDecimal(ssov.getUsdPrice(), 8); // oracle decimals is 8
};
