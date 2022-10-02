import { SsovV3 } from "../../generated/HeartbeatSwaps/SsovV3";
import {
  assetToDecimals,
  assetToSSOVC,
  plusBigDecimalAtIndex,
  sumBigDecimalArray
} from "../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { toDecimal } from "../utils/Decimals";
import {
  loadOrCreateJonesSSOVPurchaseMetric,
  loadOrCreateSummedJonesSSOVPurchaseMetric
} from "./metrics";
import { JonesSSOVPurchase } from "../../generated/schema";

export function handleSSOVPurchase(
  timestamp: BigInt,
  strikeIndex: BigInt,
  epoch: BigInt,
  amount: BigInt,
  premium: BigInt,
  totalFee: BigInt,
  asset: string,
  optionType: string
): JonesSSOVPurchase {
  const metric = loadOrCreateJonesSSOVPurchaseMetric(timestamp, asset, optionType, strikeIndex);

  const assetDecimals = assetToDecimals(asset);

  metric.epoch = epoch;
  metric.strikeIndex = strikeIndex;
  metric.amount = toDecimal(amount, assetDecimals);
  metric.premium = toDecimal(premium, assetDecimals);
  metric.totalFee = toDecimal(totalFee, assetDecimals);
  metric.save();

  const ssov = SsovV3.bind(Address.fromString(assetToSSOVC(asset)));
  const strikes = ssov.getEpochStrikes(metric.epoch);

  // We also want to maintain a metric showing the sum of all this epoch's purchases (per asset)
  const sumMetric = loadOrCreateSummedJonesSSOVPurchaseMetric(
    asset,
    optionType,
    metric.epoch,
    strikes
  );
  const i = metric.strikeIndex.toI32();

  sumMetric.optionsPurchased = plusBigDecimalAtIndex(
    sumMetric.optionsPurchased,
    i,
    sumMetric.optionsPurchased[i].plus(metric.amount)
  );
  sumMetric.premiumsPaid = plusBigDecimalAtIndex(
    sumMetric.premiumsPaid,
    i,
    sumMetric.premiumsPaid[i].plus(metric.premium)
  );
  sumMetric.feesPaid = plusBigDecimalAtIndex(
    sumMetric.feesPaid,
    i,
    sumMetric.feesPaid[i].plus(metric.totalFee)
  );

  sumMetric.totalPremiumsPaid = sumBigDecimalArray(sumMetric.premiumsPaid);
  sumMetric.totalFeesPaid = sumBigDecimalArray(sumMetric.feesPaid);
  sumMetric.save();

  return metric;
}
