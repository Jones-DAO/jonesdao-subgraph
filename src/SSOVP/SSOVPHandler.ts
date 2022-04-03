import { CurveGauge } from "./../../generated/JonesETHVaultV2/CurveGauge";
import { SSOVPutDepositsState, SSOVPutPurchasesState } from "../../generated/schema";
import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { loadOrCreateSSOVPutDepositsStateMetric } from "./SSOVPDepositsState";
import {
  assetToDecimals,
  assetToSSOVP,
  bigIntListToBigDecimalList,
  sumBigDecimalArray
} from "../helpers";
import { loadOrCreateSSOVPutPurchasesStateMetric } from "./SSOVPPurchasesState";
import { toDecimal } from "../utils/Decimals";
import { Curve2PoolSsovPut } from "../../generated/JonesETHVaultV2/Curve2PoolSsovPut";
import { get2CRVDecimals } from "../utils/2CRV";
import { CRV, CURVE_2CRV_GAUGE } from "../constants";
import { getCRVDecimals, getCRVUSDPrice } from "../utils/CRV";
import { loadSummedJonesSSOVPutPurchaseMetric } from "../JonesVaults/VaultV2Metrics";

const ZERO = BigDecimal.fromString("0");

export function updateAndGetSSOVPutDepositsState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  address: string
): SSOVPutDepositsState | null {
  const ssov = Curve2PoolSsovPut.bind(Address.fromString(assetToSSOVP(asset)));
  const maybeEpoch = ssov.try_currentEpoch();
  if (maybeEpoch.reverted) {
    return null;
  }

  if (!maybeEpoch.value.gt(BigInt.fromString("0"))) {
    return null;
  }

  // we have a valid epoch, but we only wanna calc stuff if the epoch is not expired
  if (ssov.isEpochExpired(maybeEpoch.value)) {
    return null;
  }

  const metric = loadOrCreateSSOVPutDepositsStateMetric(timestamp, dateStr, asset);

  const user = Address.fromString(address);

  const epoch = maybeEpoch.value;
  metric.epoch = epoch;
  metric.user = user.toHexString();
  metric.asset = asset;

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = bigIntListToBigDecimalList(maybeStrikes.value, 8);
  }

  const maybeAssetPrice = ssov.try_getUsdPrice();
  if (!maybeAssetPrice.reverted) {
    metric.assetPrice = toDecimal(maybeAssetPrice.value, 8);
  }

  const maybeTotalDeposits = ssov.try_getTotalEpochStrikeDeposits(epoch);
  const maybeUserDeposits = ssov.try_getUserEpochDeposits(epoch, user);

  if (!maybeTotalDeposits.reverted && !maybeUserDeposits.reverted) {
    metric.totalDeposits = bigIntListToBigDecimalList(
      maybeTotalDeposits.value,
      assetToDecimals(asset)
    );
    metric.userDeposits = bigIntListToBigDecimalList(
      maybeUserDeposits.value,
      assetToDecimals(asset)
    );

    let summedTotalDeposits: BigDecimal = BigDecimal.fromString("0");
    let summedUserDeposits: BigDecimal = BigDecimal.fromString("0");
    const newOwnerships: BigDecimal[] = [];
    for (let i = 0; i < metric.totalDeposits.length; i++) {
      const totalDeposit = metric.totalDeposits[i];
      if (totalDeposit.equals(ZERO) || metric.userDeposits[i].equals(ZERO)) {
        newOwnerships.push(BigDecimal.fromString("0"));
      } else {
        newOwnerships.push(metric.userDeposits[i].div(totalDeposit));
      }

      // do the sum stuff
      summedTotalDeposits = summedTotalDeposits.plus(totalDeposit);
      summedUserDeposits = summedUserDeposits.plus(metric.userDeposits[i]);
    }

    metric.ownership = newOwnerships;
    metric.summedTotalDeposits = summedTotalDeposits;
    metric.summedUserDeposits = summedUserDeposits;
    // try to divide and get summed ownership data
    if (!(summedTotalDeposits.equals(ZERO) || summedUserDeposits.equals(ZERO))) {
      // If neither are zero then we set the ownership ratio
      metric.summedOwnership = summedUserDeposits.div(summedTotalDeposits);
    }

    // eg [2400000000, 2700000000] or so
    const strikes = maybeStrikes.value;
    const newUserPremiums: BigDecimal[] = [];
    let summedUserPremiums = BigDecimal.fromString("0");
    for (let i = 0; i < metric.userDeposits.length; i++) {
      const userDeposit = metric.userDeposits[i];
      if (userDeposit.equals(ZERO)) {
        newUserPremiums.push(BigDecimal.fromString("0"));
      } else {
        // we have a deposit at this strike so we need to calc our premium for it so far
        const userStrikeOwnership = metric.ownership[i];
        const totalPremiumsAtStrike = ssov.totalEpochStrikePremium(epoch, strikes[i]);
        const decimalTotalPremiumsAtStrike = toDecimal(totalPremiumsAtStrike, get2CRVDecimals());
        const userPremiumsAtStrike = userStrikeOwnership.times(decimalTotalPremiumsAtStrike);
        newUserPremiums.push(userPremiumsAtStrike);
        summedUserPremiums = summedUserPremiums.plus(userPremiumsAtStrike);
      }
    }

    metric.userPremiums = newUserPremiums;
    metric.summedUserPremiums = summedUserPremiums;
    metric.totalPremiums = toDecimal(ssov.totalEpochPremium(epoch), get2CRVDecimals());

    // let's read the total CRV rewards for the SSOVP
    const curveGauge = CurveGauge.bind(Address.fromString(CURVE_2CRV_GAUGE));
    const claimableCRVInt = curveGauge.claimable_reward(
      Address.fromString(assetToSSOVP(asset)),
      Address.fromString(CRV)
    );
    const claimableCRV = toDecimal(claimableCRVInt, getCRVDecimals());

    // total deposits and premiums
    const totalDepositsAndPremiums = summedTotalDeposits.plus(metric.totalPremiums);
    const userDepositsAndPremiums = summedUserPremiums.plus(summedUserDeposits);

    if (!userDepositsAndPremiums.equals(ZERO) && !claimableCRV.equals(ZERO)) {
      const userShareOfCRVRewards = userDepositsAndPremiums.div(totalDepositsAndPremiums);
      const userCRV = claimableCRV.times(userShareOfCRVRewards);
      const userCRVInUSD = userCRV.times(getCRVUSDPrice());
      const userCRVInAsset = userCRVInUSD.div(metric.assetPrice);

      metric.crvRewards = userCRV;
      metric.crvRewardsInUSD = userCRVInUSD;
      metric.crvRewardsInUnderlying = userCRVInAsset;
    }
  }

  // Pnl calcs ish
  /**
   * Notes: when jonesdao writes a put, its all about gaining more ETH. If a written put settles ITM,
   * we have lost money in USD terms, but we have essentially bought the ETH dip. So we made more ETH than we started with.
   * (Assuming that we wrote a put under the eth price at time of writing ofc)
   * The goal of the code below is just to provide a value showing how much ETH we can convert the written put to
   * if we were to exercise at the current oracle price point.
   */

  let putInUnderlying: BigDecimal = BigDecimal.fromString("0");
  for (let i = 0; i < maybeStrikes.value.length; i++) {
    const strikePrice = toDecimal(maybeStrikes.value[i], 8);
    if (metric.userDeposits[i].gt(ZERO)) {
      // we have a deposit here
      if (metric.assetPrice.gt(strikePrice)) {
        // Put is OTM, so we just convert all our stables in this position to the underlying asset at current price
        const totalStables = metric.userDeposits[i].plus(metric.userPremiums[i]);
        const equivalentInUnderlying = totalStables.div(metric.assetPrice);
        putInUnderlying = putInUnderlying.plus(equivalentInUnderlying);
      } else {
        // put is ITM, meaning that we're essentially buying the underlying asset with our stables at the strike price
        const underlyingBought = metric.userDeposits[i].div(strikePrice);

        // then we also convert premiums to ETH at the current price (same as if statement above) since the option is only for the put amount, not the premium on top
        const premiumsInUnderlying = metric.userPremiums[i].div(metric.assetPrice);
        putInUnderlying = putInUnderlying.plus(underlyingBought.plus(premiumsInUnderlying));
      }
    }
  }

  metric.positionsValueInUnderlying = putInUnderlying.plus(metric.crvRewardsInUnderlying);

  metric.save();
  return metric;
}

export function updateAndGetSSOVPutPurchasesState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  address: string
): SSOVPutPurchasesState | null {
  const ssov = Curve2PoolSsovPut.bind(Address.fromString(assetToSSOVP(asset)));
  const maybeEpoch = ssov.try_currentEpoch();
  if (maybeEpoch.reverted) {
    return null;
  }
  if (!maybeEpoch.value.gt(BigInt.fromString("0"))) {
    return null;
  }
  // we have a valid epoch, but we only wanna calc stuff if the epoch is not expired
  if (ssov.isEpochExpired(maybeEpoch.value)) {
    return null;
  }

  const epoch = maybeEpoch.value;
  const metric = loadOrCreateSSOVPutPurchasesStateMetric(timestamp, dateStr, asset);

  const user = Address.fromString(address);

  metric.epoch = epoch;
  metric.user = user.toHexString();
  metric.asset = asset;

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = bigIntListToBigDecimalList(maybeStrikes.value, 8);
  }

  const maybeUserPutPurchases = ssov.try_getUserEpochPutsPurchased(epoch, user);

  if (!maybeUserPutPurchases.reverted) {
    metric.putsPurchased = bigIntListToBigDecimalList(
      maybeUserPutPurchases.value,
      assetToDecimals(asset) // puts purchased are denominated in the ssovp asset, eg ETH, gOHM, DPX
    );
    metric.premiumsPaid = bigIntListToBigDecimalList(
      ssov.getUserEpochPremium(epoch, user),
      get2CRVDecimals() // premiums are denominated in 2CRV (stablecoin)
    );
  }

  const maybeAssetPrice = ssov.try_getUsdPrice();
  if (!maybeAssetPrice.reverted) {
    metric.assetPrice = toDecimal(maybeAssetPrice.value, 8);
  }

  // pnl calcs
  /**
   * Notes:
   * If the purchased put option expires OTM, its worthless right. So OTM = 0.
   * If ITM, then just get the spread and multiply by ETH price. That's how many ETH we're gonna be able to buy with the profits.
   */

  let profitsInUnderlying: BigDecimal = BigDecimal.fromString("0");
  for (let i = 0; i < maybeStrikes.value.length; i++) {
    const strikePrice = metric.strikes[i];
    if (metric.putsPurchased[i].gt(ZERO)) {
      // if we have a purchase here
      if (metric.assetPrice.lt(strikePrice)) {
        // we're ITM
        const nPuts = metric.putsPurchased[i];
        const spread = strikePrice.minus(metric.assetPrice);
        const profitInUSD = spread.times(nPuts);
        const profitInUnderlying = profitInUSD.div(metric.assetPrice);
        profitsInUnderlying = profitsInUnderlying.plus(profitInUnderlying);
      }
    }
  }

  metric.positionsValueInUnderlying = profitsInUnderlying;

  // lets get the fee breakdown as well
  const maybePurchasesMetric = loadSummedJonesSSOVPutPurchaseMetric(asset, epoch);
  if (maybePurchasesMetric != null) {
    metric.feesPaid = maybePurchasesMetric.feesPaid;
    metric.costToExercise = maybePurchasesMetric.costToExercise;
  }

  metric.totalPremiumsPaid = sumBigDecimalArray(metric.premiumsPaid);
  metric.totalFeesPaid = sumBigDecimalArray(metric.feesPaid);

  metric.save();
  return metric;
}
