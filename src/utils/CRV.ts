import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { CRV_SSOVP } from "../constants";
import { Curve2PoolSsovPut } from "./../../generated/JETHETHSwaps/Curve2PoolSsovPut";
import { toDecimal } from "./Decimals";

export function getCRVDecimals(): number {
  return 18;
}

export function getCRVUSDPrice(): BigDecimal {
  // use the dopex oracle
  const ssov = Curve2PoolSsovPut.bind(Address.fromString(CRV_SSOVP));
  return toDecimal(ssov.getUsdPrice(), 8); // oracle decimals is 8
}
