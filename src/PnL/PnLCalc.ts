import { BigDecimal, log } from "@graphprotocol/graph-ts";
import { SSOVCallDepositsState, SSOVCallPurchasesState } from "../../generated/schema";
import { DOPEX_EXERCISE_FEE } from "../constants";

const ZERO = BigDecimal.fromString("0");

/**
 *
 * @param deposits The deposits state
 * @returns an array with [pnl, deposit, current]
 */
export function calculateWrittenCallPnl(deposits: SSOVCallDepositsState): BigDecimal[] {
  let totalPremiumGained = BigDecimal.fromString("0");
  let totalProfit = BigDecimal.fromString("0");
  let totalDeposits = BigDecimal.fromString("0");

  for (let i = 0; i < deposits.strikes.length; i++) {
    let strike = deposits.strikes[i];
    let price = deposits.assetPrice;
    let amount = deposits.userDeposits[i];
    if (amount.gt(ZERO)) {
      totalDeposits = totalDeposits.plus(amount);
      totalPremiumGained = totalPremiumGained.plus(deposits.userPremiums[i]);
      let profitAtStrike = deposits.userPremiums[i];
      let lossAtStrike = strike.lt(price)
        ? getVaultPnL(price, strike, amount)
        : BigDecimal.fromString("0");

      totalProfit = totalProfit.plus(profitAtStrike).minus(lossAtStrike);
    }
  }

  // zero for all assets except for DPX
  const totalFarmProfits = deposits.userFarmRewards;
  // zero for all assets except for ETH (as of right now)
  const totalRewardProfits = deposits.summedUserDepositRewards;
  const pnl = totalProfit.plus(totalFarmProfits).plus(totalRewardProfits);

  return [pnl, totalDeposits, totalDeposits.plus(pnl)];
}

// https://github.com/Jones-DAO/jones_pnl_service/blob/main/src/strategies/dopex/OptionsBuyingStrategy.ts
export function calculatePurchasedCallPnl(purchases: SSOVCallPurchasesState): BigDecimal {
  let totalPremiumPaid = BigDecimal.fromString("0");
  let totalCalls = BigDecimal.fromString("0");
  let totalProfit = BigDecimal.fromString("0");

  const price = purchases.assetPrice;

  for (let i = 0; i < purchases.strikes.length; i++) {
    const premiumPaid = purchases.premiumsPaid[i];
    const calls = purchases.callsPurchased[i];
    const strike = purchases.strikes[i];
    const costToExercise = calls.times(DOPEX_EXERCISE_FEE);

    totalCalls = totalCalls.plus(calls);
    totalPremiumPaid = totalPremiumPaid.plus(premiumPaid);

    // We're in the money
    if (calls.gt(ZERO) && strike.lt(price)) {
      const assetMultiplier = price.div(strike);
      const executedAssetAtStrike = calls.times(assetMultiplier);
      const profit = executedAssetAtStrike.minus(calls).minus(costToExercise);
      totalProfit = totalProfit.plus(profit);
    }
  }

  const finalProfit = totalProfit.minus(totalPremiumPaid);
  return finalProfit;
}

/* https://docs.dopex.io/single-staking-options-vault-ssov */
export function getVaultPnL(price: BigDecimal, strike: BigDecimal, amount: BigDecimal): BigDecimal {
  //((price - strike) * amount) / price;
  const diff = price.minus(strike);
  const diffTimesAmount = diff.times(amount);
  const result = diffTimesAmount.div(price);

  return result.lt(ZERO) ? BigDecimal.fromString("0") : result;
}
