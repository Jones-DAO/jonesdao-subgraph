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
//import { Asset } from "../types";

// export function handleNewDeposit(asset: string, event: NewDeposit): void {
//   const metric = loadOrCreateSSOVDepositMetric(event.block.timestamp, asset, event.params.strike);
//   metric.epoch = event.params.epoch;
//   metric.amount = event.params.amount;
//   metric.strike = event.params.strike;
//   metric.sender = event.params.sender;
//   metric.user = event.params.user;

//   metric.save();
// }

// export function handleNewPurchase(asset: string, event: NewPurchase): void {
//   const metric = loadOrCreateSSOVPurchaseMetric(event.block.timestamp, asset, event.params.strike);
//   metric.epoch = event.params.epoch;
//   metric.amount = event.params.amount;
//   metric.strike = event.params.strike;
//   metric.fee = event.params.fee;
//   metric.premium = event.params.premium;
//   metric.sender = event.params.sender;
//   metric.user = event.params.user;

//   metric.save();
// }

// export function handlePutDeposit(asset: string, event: Deposit): void {
//   const metric = loadOrCreateSSOVPutDepositMetric(
//     event.block.timestamp,
//     asset,
//     event.params.strike
//   );
//   metric.epoch = event.params.epoch;
//   metric.amount = event.params.amount;
//   metric.strike = event.params.strike;
//   metric.sender = event.params.sender;
//   metric.user = event.params.user;

//   metric.save();
// }

// export function handlePutPurchase(asset: string, event: Purchase): void {
//   const metric = loadOrCreateSSOVPutPurchaseMetric(
//     event.block.timestamp,
//     asset,
//     event.params.strike
//   );
//   metric.epoch = event.params.epoch;
//   metric.amount = event.params.amount;
//   metric.strike = event.params.strike;
//   metric.fee = event.params.fee;
//   metric.premium = event.params.premium;
//   metric.sender = event.params.sender;
//   metric.user = event.params.user;

//   metric.save();
// }

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

    const newOwnerships: BigDecimal[] = [];
    for (let i = 0; i < metric.totalDeposits.length; i++) {
      const totalDeposit = metric.totalDeposits[i];
      if (
        totalDeposit.equals(BigDecimal.fromString("0")) ||
        metric.userDeposits[i].equals(BigDecimal.fromString("0"))
      ) {
        newOwnerships.push(BigDecimal.fromString("0"));
      } else {
        newOwnerships.push(metric.userDeposits[i].div(totalDeposit));
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
        if (totalPremium.equals(BigDecimal.fromString("0"))) {
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
