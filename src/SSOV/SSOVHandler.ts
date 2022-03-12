import { ArbEthSSOVV2 } from "./../../generated/ETHSSOV/ArbEthSSOVV2";
import { Deposit, Purchase } from "./../../generated/Curve2PoolSsovPut/Curve2PoolSsovPut";
import { NewDeposit, NewPurchase } from "../../generated/ETHSSOV/ArbEthSSOVV2";
import {
  loadOrCreateSSOVDepositMetric,
  loadOrCreateSSOVPurchaseMetric,
  loadOrCreateSSOVPutDepositMetric,
  loadOrCreateSSOVPutPurchaseMetric
} from "./SSOVMetric";
import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { loadOrCreateSSOVDepositsStateMetric } from "./SSOVDepositsState";
import { assetToDecimals, assetToSSOVC, bigIntListToBigDecimalList } from "../helpers";
import { loadOrCreateSSOVPurchasesStateMetric } from "./SSOVPurchasesState";
import { toDecimal } from "../utils/Decimals";
import { getEarningsFromDPXFarm } from "../Farms/DPXFarm";
import { DPX_SSOV_V2 } from "../constants";

const ZERO = BigDecimal.fromString("0");

export function updateSSOVDepositsState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  address: string
): void {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const maybeEpoch = ssov.try_currentEpoch();
  if (maybeEpoch.reverted) {
    return;
  }

  const metric = loadOrCreateSSOVDepositsStateMetric(timestamp, dateStr, asset);

  const user = Address.fromString(address);

  if (!maybeEpoch.value.gt(BigInt.fromString("0"))) {
    return;
  }

  metric.epoch = maybeEpoch.value;
  const epoch = maybeEpoch.value;
  metric.user = user.toHexString();
  metric.asset = asset;

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = bigIntListToBigDecimalList(maybeStrikes.value, 8);
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

    metric.summedTotalDeposits = summedTotalDeposits;
    metric.summedUserDeposits = summedUserDeposits;
    // try to divide and get summed ownership data
    if (!(summedTotalDeposits.equals(ZERO) || summedUserDeposits.equals(ZERO))) {
      // If neither are zero then we set the ownership ratio
      metric.summedOwnership = summedUserDeposits.div(summedTotalDeposits);

      if (asset === "DPX") {
        // Then we look at the farming stuff
        const ssovDPXEarned = getEarningsFromDPXFarm(DPX_SSOV_V2);
        const userDPXEarned = ssovDPXEarned.times(metric.summedOwnership);
        metric.totalFarmRewards = ssovDPXEarned;
        metric.userFarmRewards = userDPXEarned;
      }
    }

    metric.ownership = newOwnerships;

    const maybeTotalPremiums = ssov.try_getTotalEpochPremium(epoch);
    if (!maybeTotalPremiums.reverted) {
      metric.totalPremiums = bigIntListToBigDecimalList(
        maybeTotalPremiums.value,
        assetToDecimals(asset)
      );

      const newUserPremiums: BigDecimal[] = [];
      for (let i = 0; i < metric.totalPremiums.length; i++) {
        const totalPremium = metric.totalPremiums[i];
        if (totalPremium.equals(ZERO)) {
          newUserPremiums.push(BigDecimal.fromString("0"));
        } else {
          newUserPremiums.push(totalPremium.times(metric.ownership[i]));
        }
      }

      metric.userPremiums = newUserPremiums;
    }
  }

  const maybeAssetPrice = ssov.try_getUsdPrice();
  if (!maybeAssetPrice.reverted) {
    metric.assetPrice = toDecimal(maybeAssetPrice.value, 8);
  }

  metric.save();
}

export function updateSSOVPurchasesState(
  timestamp: BigInt,
  dateStr: string,
  asset: string,
  address: string
): void {
  const ssov = ArbEthSSOVV2.bind(Address.fromString(assetToSSOVC(asset)));
  const maybeEpoch = ssov.try_currentEpoch();
  if (maybeEpoch.reverted) {
    return;
  }

  const metric = loadOrCreateSSOVPurchasesStateMetric(timestamp, dateStr, asset);

  const user = Address.fromString(address);

  if (!maybeEpoch.value.gt(BigInt.fromString("0"))) {
    return;
  }

  metric.epoch = maybeEpoch.value;
  const epoch = maybeEpoch.value;
  metric.user = user.toHexString();
  metric.asset = asset;

  const maybeStrikes = ssov.try_getEpochStrikes(epoch);
  if (!maybeStrikes.reverted) {
    metric.strikes = bigIntListToBigDecimalList(maybeStrikes.value, 8);
  }

  const maybeUserCallPurchases = ssov.try_getUserEpochCallsPurchased(epoch, user);

  if (!maybeUserCallPurchases.reverted) {
    metric.callsPurchased = bigIntListToBigDecimalList(
      maybeUserCallPurchases.value,
      assetToDecimals(asset)
    );
    metric.premiumsPaid = bigIntListToBigDecimalList(
      ssov.getUserEpochPremium(epoch, user),
      assetToDecimals(asset)
    );
  }

  const maybeAssetPrice = ssov.try_getUsdPrice();
  if (!maybeAssetPrice.reverted) {
    metric.assetPrice = toDecimal(maybeAssetPrice.value, 8);
  }

  metric.save();
}
