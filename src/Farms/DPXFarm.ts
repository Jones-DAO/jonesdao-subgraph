import { DPX_FARM } from "./../constants";
import { StakingRewards } from "./../../generated/JETHETHSwaps/StakingRewards";
import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { toDecimal } from "../utils/Decimals";
import { getDPXDecimals } from "../utils/DPX";
import { getRDPXDecimals, rDPXToDPX } from "../utils/RDPX";

// Gets data from the DPX Farm
// Returns earnings denominated as DPX
/**
 *
 * @param address
 * @returns Returns [deposits, earnings]
 */
export function getEarningsFromDPXFarm(address: string): BigDecimal[] {
  const farm = StakingRewards.bind(Address.fromString(DPX_FARM));
  const user = Address.fromString(address);
  const deposits = toDecimal(farm.balanceOf(user), getDPXDecimals());
  const earnings = farm.earned(user);
  const dpxEarned = toDecimal(earnings.value0, getDPXDecimals());
  const rdpxEarned = toDecimal(earnings.value1, getRDPXDecimals());

  const earnedInDPX = dpxEarned.plus(rDPXToDPX(rdpxEarned));
  return [deposits, earnedInDPX];
}
