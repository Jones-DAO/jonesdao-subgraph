import { Address } from "@graphprotocol/graph-ts";

export const getUSDCDecimals = (): number => {
  // for speed just hardcode it
  return 6; // https://arbiscan.io/address/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8#readProxyContract
};
