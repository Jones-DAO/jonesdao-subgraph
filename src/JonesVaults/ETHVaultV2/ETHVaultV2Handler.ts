import {
  EpochStarted,
  SSOVCallPurchase,
  SSOVDeposit,
  SSOVPDeposit,
  SSOVPutPurchase
} from "../../../generated/JonesETHVaultV2/JonesArbETHVaultV2";
import { loadOrCreateETHBalanceMetric } from "./ETHVaultBalanceMetric";
import {
  handleEpochStarted,
  handleSSOVCallDeposit,
  handleSSOVCallPurchase,
  handleSSOVPutDeposit,
  handleSSOVPutPurchase
} from "../VaultV2Handler";
import { getWETHPrice } from "../../utils/WETH";

/**
 * Note! The ETH metric are different because it's not an ERC20. So we need to keep track of the ETH balance as a function of all events
 * For the other underlying assets we can just do balanceOf(ERC20). But not for ETH, we cant get the native ETH balance via The Graph.
 *
 */

export function handleJonesVaultETHCallDeposit(event: SSOVDeposit): void {
  const metric = handleSSOVCallDeposit(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    "ETH"
  );

  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = balanceMetric.balance.minus(metric.amount);
  balanceMetric.save();
}

export function handleJonesVaultETHCallPurchase(event: SSOVCallPurchase): void {
  const metric = handleSSOVCallPurchase(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    event.params._premium,
    event.params._totalFee,
    "ETH"
  );

  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = balanceMetric.balance.minus(metric.premium).minus(metric.totalFee);
  balanceMetric.save();
}

export function handleJonesVaultETHPutDeposit(event: SSOVPDeposit): void {
  const metric = handleSSOVPutDeposit(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    "ETH"
  );

  const balanceMetric = loadOrCreateETHBalanceMetric();
  // Important! The amount above is in 2CRV. We have to deduct an ETH amount from the balance, so do a conversion here before subtracting.
  // Note that this thus will be INDICATIVE -> NOT exact due to slippage and timing issues.
  balanceMetric.balance = balanceMetric.balance.minus(metric.amount.times(getWETHPrice()));
  balanceMetric.save();
}

export function handleJonesVaultETHPutPurchase(event: SSOVPutPurchase): void {
  const metric = handleSSOVPutPurchase(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    event.params._premium,
    event.params._totalFee,
    "ETH"
  );

  const balanceMetric = loadOrCreateETHBalanceMetric();
  // Again, premium and totalFee here are in 2CRV, so we need to convert them into ETH before subtracting this cost from the ETH balance.
  const costIn2CRV = metric.premium.plus(metric.totalFee);
  const costInETH = costIn2CRV.times(getWETHPrice());
  balanceMetric.balance = balanceMetric.balance.minus(costInETH);
  balanceMetric.save();
}

export function handleJonesVaultETHEpochStarted(event: EpochStarted): void {
  const metric = handleEpochStarted(
    event.params._timestamp,
    event.params._assetAmount,
    event.params._jonesAssetSupply,
    "ETH"
  );

  // when the epoch starts, reset the ETH balance to the amount in this event
  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = metric.amount;

  balanceMetric.save();
}
