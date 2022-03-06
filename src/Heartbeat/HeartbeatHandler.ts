import { BigInt } from "@graphprotocol/graph-ts";
import { Swap } from "../../generated/JonesETHVaultV1/UniswapV2Pair";
import { ASSET_MGMT_MULTISIG } from "../constants";
import { assetToJonesVaultV2, shouldReadAsset } from "../helpers";
import { collectJAssetData } from "../JAsset/JAssetHandler";
import { updateSSOVDepositsState, updateSSOVPurchasesState } from "../SSOV/SSOVHandler";
import { timestampToISODateString, timestampToISOHourString } from "../utils/Date";
import { loadOrCreateHeartbeat } from "./HeartbeatMetric";

const assets: string[] = ["ETH", "DPX", "GOHM"];
const lastBlockOfJonesAsstMgmtMultisig = "7209882";

export function handleSwap(event: Swap): void {
  // Just do something
  const timestamp = event.block.timestamp;
  const dateStr = timestampToISODateString(timestamp);
  const heartbeat = loadOrCreateHeartbeat(dateStr, timestamp);

  // we've already done stuff for this heartbeat.
  if (timestamp.notEqual(heartbeat.timestamp)) return;

  // Let's gather all data for this heartbeat! -----

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];

    if (shouldReadAsset(asset, event.block.number)) {
      collectJAssetData(dateStr, asset, timestamp);

      // Depending on the block nr we either get the old asset mgmt wallet addr or the new vault addr (which in turn is dependent on the asset at hand)
      const userAddr = event.block.number.le(BigInt.fromString(lastBlockOfJonesAsstMgmtMultisig))
        ? ASSET_MGMT_MULTISIG
        : assetToJonesVaultV2(asset);

      updateSSOVDepositsState(timestamp, dateStr, asset, userAddr);
      updateSSOVPurchasesState(timestamp, dateStr, asset, userAddr);
    }
  }
}
