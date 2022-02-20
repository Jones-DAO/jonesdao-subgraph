import { ASSET_MGMT_MULTISIG, ETH_SSOV_V2 } from "./../constants";
import { ArbEthSSOVV2 } from "./../../generated/GOHMSSOV/ArbEthSSOVV2";
import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { NewDeposit } from "../../generated/ETHSSOV/ArbEthSSOVV2";
import { SSOVDepositsState } from "../../generated/schema";

export function loadOrCreateSSOVDepositsStateMetric(
  timestamp: BigInt,
  asset: string
): SSOVDepositsState {
  let metric = SSOVDepositsState.load(timestamp.toString() + asset);

  if (metric == null) {
    metric = new SSOVDepositsState(timestamp.toString() + asset);
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.epoch = BigInt.fromString("-1");
    metric.strikes = [];
    metric.userDeposits = [];
    metric.totalPremiums = [];
    metric.ownership = [];
    metric.userPremiums = [];
    metric.assetPrice = BigInt.fromString("-1");
    metric.user = "";

    metric.save();
  } else {
    metric.timestamp = timestamp;
    metric.asset = asset;
    metric.save();
  }

  return metric;
}
