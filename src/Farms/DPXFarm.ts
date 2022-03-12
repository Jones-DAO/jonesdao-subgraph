import { DPX_FARM, JONES_ETH_VAULT_V2 } from "./../constants";
import { StakingRewards } from "./../../generated/JETHETHSwaps/StakingRewards";
import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { toDecimal } from "../utils/Decimals";
import { getDPXDecimals } from "../utils/DPX";
import { getRDPXDecimals, rDPXToDPX } from "../utils/RDPX";

// Gets data from the DPX Farm
// Returns earnings denominated as DPX
export function getEarningsFromDPXFarm(address: string): BigDecimal {
  const farm = StakingRewards.bind(Address.fromString(DPX_FARM));
  const earnings = farm.earned(Address.fromString(address));
  const dpxEarned = toDecimal(earnings.value0, getDPXDecimals());
  const rdpxEarned = toDecimal(earnings.value1, getRDPXDecimals());

  const earnedInDPX = dpxEarned.plus(rDPXToDPX(rdpxEarned));
  return earnedInDPX;
}
