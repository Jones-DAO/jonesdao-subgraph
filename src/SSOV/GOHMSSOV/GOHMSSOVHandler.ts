import { GohmSSOVV2 } from "./../../../generated/Chainlink/GohmSSOVV2";
import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { NewDeposit, NewPurchase } from "../../../generated/ETHSSOV/ArbEthSSOVV2";
import { ASSET_MGMT_MULTISIG, GOHM_SSOV_V2 } from "../../constants";
import { loadOrCreateSSOVDepositsStateMetric } from "../SSOVDepositsState";
import { Deposit, Purchase } from "../../../generated/Curve2PoolSsovPut/Curve2PoolSsovPut";

// export function handleNewDepositGOHM(event: NewDeposit): void {
//   if (event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
//     handleNewDeposit("GOHM", event);
//     updateSSOVDepositsState(event.block.timestamp, "GOHM");
//   }
// }

// export function handleNewPurchaseGOHM(event: NewPurchase): void {
//   if (event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
//     handleNewPurchase("GOHM", event);
//   }

//   updateSSOVDepositsState(event.block.timestamp, "GOHM");
// }

// export function handlePutPurchaseGOHM(event: Purchase): void {
//   if (event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
//     handlePutPurchase("GOHM", event);
//   }
// }

// export function handlePutDepositGOHM(event: Deposit): void {
//   if (event.params.user.equals(Address.fromString(ASSET_MGMT_MULTISIG))) {
//     handlePutDeposit("GOHM", event);
//   }
// }

// export function updateGOHMSSOVDepositsState(
//   timestamp: BigInt,
//   dateStr: string,
//   asset: string
// ): void {
//   const metric = loadOrCreateSSOVDepositsStateMetric(timestamp, dateStr, asset);

//   const user = Address.fromString(ASSET_MGMT_MULTISIG);

//   const ssov = GohmSSOVV2.bind(Address.fromString(GOHM_SSOV_V2));
//   const maybeEpoch = ssov.try_currentEpoch();
//   if (maybeEpoch.reverted) {
//     return;
//   }

//   if (!maybeEpoch.value.gt(BigInt.fromString("0"))) {
//     return;
//   }

//   metric.epoch = maybeEpoch.value;
//   const epoch = maybeEpoch.value;
//   metric.user = user.toHexString();
//   metric.asset = asset;

//   const maybeStrikes = ssov.try_getEpochStrikes(epoch);
//   if (!maybeStrikes.reverted) {
//     metric.strikes = maybeStrikes.value;
//   }

//   const maybeTotalDeposits = ssov.try_getTotalEpochStrikeDeposits(epoch);
//   const maybeUserDeposits = ssov.try_getUserEpochDeposits(epoch, user);

//   if (!maybeTotalDeposits.reverted && !maybeUserDeposits.reverted) {
//     metric.totalDeposits = maybeTotalDeposits.value;
//     metric.userDeposits = maybeUserDeposits.value;
//     const newOwnerships: BigDecimal[] = [];
//     for (let i = 0; i < metric.totalDeposits.length; i++) {
//       const totalDeposit = metric.totalDeposits[i];
//       if (
//         totalDeposit.equals(BigInt.fromString("0")) ||
//         metric.userDeposits[i].equals(BigInt.fromString("0"))
//       ) {
//         newOwnerships.push(BigDecimal.fromString("0"));
//       } else {
//         newOwnerships.push(metric.userDeposits[i].divDecimal(totalDeposit.toBigDecimal()));
//       }
//     }

//     metric.ownership = newOwnerships;

//     const maybeTotalPremiums = ssov.try_getTotalEpochPremium(epoch);
//     if (!maybeTotalPremiums.reverted) {
//       metric.totalPremiums = maybeTotalPremiums.value;
//       const newUserPremiums: BigDecimal[] = [];
//       for (let i = 0; i < metric.totalPremiums.length; i++) {
//         const totalPremium = metric.totalPremiums[i];
//         if (totalPremium.equals(BigInt.fromString("0"))) {
//           newUserPremiums.push(BigDecimal.fromString("0"));
//         } else {
//           newUserPremiums.push(totalPremium.toBigDecimal().times(metric.ownership[i]));
//         }
//       }

//       metric.userPremiums = newUserPremiums;
//     }
//   }

//   const maybeAssetPrice = ssov.try_getUsdPrice();
//   if (!maybeAssetPrice.reverted) {
//     metric.assetPrice = maybeAssetPrice.value;
//   }

//   metric.save();
// }
