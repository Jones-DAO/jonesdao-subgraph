import { ArbEthSSOVV2 } from "./../../generated/USDCWETHSwaps/ArbEthSSOVV2";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ETH_SSOV_V2, ETH_VAULT, JONES_ETH_VAULT_V2 } from "../constants";
import {
  SSOVCallPurchase,
  EpochStarted,
  SSOVDeposit,
  JonesArbETHVaultV2
} from "./../../generated/JonesETHVaultV2/JonesArbETHVaultV2";
import { loadOrCreateETHEpochStartedMetric } from "./JonesVaultEpochStartedMetric";
import { toDecimal } from "../utils/Decimals";
import { getWETHDecimals } from "../utils/WETH";
import { loadOrCreateETHSSOVCallPurchaseMetric } from "./SSOVCallPurchaseMetric";
import { loadOrCreateETHSSOVDepositMetric } from "./SSOVDepositMetric";
import { loadOrCreateETHBalanceMetric } from "./ETHVaultBalanceMetric";

export function handleSSOVDeposit(event: SSOVDeposit): void {
  const metric = loadOrCreateETHSSOVDepositMetric(event.block.timestamp, event.params._strikeIndex);
  metric.epoch = event.params._epoch.plus(BigInt.fromString("1"));
  metric.strikeIndex = event.params._strikeIndex;
  metric.amount = toDecimal(event.params._amount, getWETHDecimals());
  metric.save();

  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = balanceMetric.balance.minus(metric.amount);
  balanceMetric.save();
}

export function handleSSOVCallPurchase(event: SSOVCallPurchase): void {
  const metric = loadOrCreateETHSSOVCallPurchaseMetric(
    event.block.timestamp,
    event.params._strikeIndex
  );
  metric.epoch = event.params._epoch;
  metric.strikeIndex = event.params._strikeIndex;
  metric.amount = toDecimal(event.params._amount, getWETHDecimals());
  metric.premium = toDecimal(event.params._premium, getWETHDecimals());
  metric.totalFee = toDecimal(event.params._totalFee, getWETHDecimals());
  metric.save();

  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = balanceMetric.balance.minus(metric.premium).minus(metric.totalFee);
  balanceMetric.save();
}

export function handleEpochStarted(event: EpochStarted): void {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(ETH_SSOV_V2));
  const epoch = ssov.currentEpoch().plus(BigInt.fromString("1"));

  const metric = loadOrCreateETHEpochStartedMetric(epoch);
  metric.timestamp = event.block.timestamp;
  metric.amount = toDecimal(event.params._assetAmount, getWETHDecimals());
  metric.jAssetAmount = toDecimal(event.params._jonesAssetSupply, getWETHDecimals());
  metric.epoch = epoch; // epoch is also the ID of the metric

  metric.save();

  // when the epoch starts, reset the ETH balance to the amount in this event
  const balanceMetric = loadOrCreateETHBalanceMetric();
  balanceMetric.balance = metric.amount;

  balanceMetric.save();
}
