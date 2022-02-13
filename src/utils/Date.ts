import { BigInt } from "@graphprotocol/graph-ts";

export function getISOHourString(date: Date): string {
  return date.toISOString().substring(0, 13);
}

export function timestampToISOHourString(timestamp: BigInt): string {
  return getISOHourString(new Date(timestamp.toU64() * 1000));
}
