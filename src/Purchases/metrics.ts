import { JonesSSOVPurchase, SummedJonesSSOVPurchase } from "../../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function loadOrCreateJonesSSOVPurchaseMetric(
  timestamp: BigInt,
  asset: string,
  optionType: string,
  strikeIndex: BigInt
): JonesSSOVPurchase {
  let metric = JonesSSOVPurchase.load(
    timestamp.toString() + asset + optionType + strikeIndex.toString()
  );

  if (metric == null) {
    metric = new JonesSSOVPurchase(
      timestamp.toString() + asset + optionType + strikeIndex.toString()
    );
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.optionType = asset;
    metric.epoch = BigInt.fromString("0");
    metric.strikeIndex = BigInt.fromString("0");
    metric.amount = BigDecimal.fromString("0");
    metric.totalFee = BigDecimal.fromString("0");
    metric.premium = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}

export function loadOrCreateSummedJonesSSOVPurchaseMetric(
  asset: string,
  optionType: string,
  epoch: BigInt,
  strikes: BigInt[]
): SummedJonesSSOVPurchase {
  let metric = SummedJonesSSOVPurchase.load(asset + optionType + epoch.toString());

  if (metric == null) {
    metric = new SummedJonesSSOVPurchase(asset + optionType + epoch.toString());
    metric.asset = asset;
    metric.optionType = optionType;
    metric.epoch = epoch;
    metric.strikes = strikes;

    let optionsPurchased: BigDecimal[] = [];
    let premiumsPaid: BigDecimal[] = [];
    let feesPaid: BigDecimal[] = [];

    for (let i = 0; i < strikes.length; i++) {
      optionsPurchased.push(BigDecimal.fromString("0"));
      premiumsPaid.push(BigDecimal.fromString("0"));
      feesPaid.push(BigDecimal.fromString("0"));
    }

    metric.optionsPurchased = optionsPurchased;
    metric.premiumsPaid = premiumsPaid;
    metric.feesPaid = feesPaid;
    metric.totalPremiumsPaid = BigDecimal.fromString("0");
    metric.totalFeesPaid = BigDecimal.fromString("0");

    metric.save();
  }

  return metric;
}

export function loadSummedJonesSSOVPurchaseMetric(
  asset: string,
  optionType: string,
  epoch: BigInt
): SummedJonesSSOVPurchase | null {
  return SummedJonesSSOVPurchase.load(asset + optionType + epoch.toString());
}
