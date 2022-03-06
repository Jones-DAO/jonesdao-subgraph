import { BigInt } from "@graphprotocol/graph-ts";

export function timestampToISODateString(timestamp: BigInt): string {
  const date = new Date(timestamp.toU64() * 1000);
  return date.toISOString().split("T")[0];
}

export function getISOHourString(date: Date): string {
  return date.toISOString().substring(0, 13);
}

export function timestampToISOHourString(timestamp: BigInt): string {
  return getISOHourString(new Date(timestamp.toU64() * 1000));
}
