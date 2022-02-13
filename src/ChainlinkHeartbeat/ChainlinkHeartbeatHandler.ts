import {
  ChainlinkAnswerUpdatedHeartbeat,
  ChainlinkNewRoundHeartbeat
} from "./../../generated/schema";
import { AnswerUpdated, NewRound } from "./../../generated/Chainlink/EACAggregatorProxy";
export function handleAnswerUpdated(event: AnswerUpdated): void {
  const metric = new ChainlinkAnswerUpdatedHeartbeat(event.block.timestamp.toString());
  metric.timestamp = event.block.timestamp;
  metric.date = new Date(+event.block.timestamp.toString() * 1000).toISOString();
  metric.save();
}

export function handleNewRound(event: NewRound): void {
  const metric = new ChainlinkNewRoundHeartbeat(event.block.timestamp.toString());
  metric.timestamp = event.block.timestamp;
  metric.date = new Date(+event.block.timestamp.toString() * 1000).toISOString();
  metric.save();
}
