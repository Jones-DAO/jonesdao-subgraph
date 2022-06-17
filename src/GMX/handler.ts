import { Address, BigInt } from "@graphprotocol/graph-ts";
import { loadOrCreateGMXPositionMetric } from "./metric";
import { tokenAddressToAsset } from "../helpers";

export const handleIncreasePosition = (
  collateralToken: Address,
  indexToken: Address,
  positionType: string,
  hedgingAsset: string
) => {
  let metric = loadOrCreateGMXPositionMetric(hedgingAsset);

  const collateralAsset = tokenAddressToAsset(collateralToken.toHex());
  const indexAsset = tokenAddressToAsset(indexToken.toHex());

  const positionString = `${collateralAsset}-${indexAsset}-${positionType}`;

  if (!metric.positions.includes(positionString)) {
    metric.positions.push(positionString);
  }

  metric.save();
};
