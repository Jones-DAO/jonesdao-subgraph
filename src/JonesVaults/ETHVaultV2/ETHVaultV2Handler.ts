import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit
} from "../../../generated/JonesETHVaultV2/JonesArbETHVaultV2";
import { loadOrCreateETHBalanceMetric } from "./ETHVaultBalanceMetric";
import {
  handleEpochStarted,
  handleSSOVCallDeposit,
  handleSSOVCallPurchase
} from "../VaultV2Handler";

/**
 * Note! The ETH metric are different because it's not an ERC20. So we need to keep track of the ETH balance as a function of all events
 * For the other underlying assets we can just do balanceOf(ERC20). But not for ETH, we cant get the native ETH balance via The Graph.
 *
 */

export function handleJonesVaultETHCallDeposit(event: SSOVDeposit): void {
  const metric = handleSSOVCallDeposit(event, "ETH");

  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = balanceMetric.balance.minus(metric.amount);
  balanceMetric.save();
}

export function handleJonesVaultETHCallPurchase(event: SSOVCallPurchase): void {
  const metric = handleSSOVCallPurchase(event, "ETH");

  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = balanceMetric.balance.minus(metric.premium).minus(metric.totalFee);
  balanceMetric.save();
}

export function handleJonesVaultETHEpochStarted(event: EpochStarted): void {
  const metric = handleEpochStarted(event, "ETH");

  // when the epoch starts, reset the ETH balance to the amount in this event
  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = metric.amount;

  balanceMetric.save();
}
