import { handleIncreasePosition } from "../handler";
import { IncreasePosition } from "../../../generated/JonesHedgingV3StrategyDPX/JonesHedgingV3Strategy";
import { LONG, SHORT } from "../../constants";

export function onIncreasePosition(event: IncreasePosition): void {
  handleIncreasePosition(
    event.params._collateralToken,
    event.params._indexToken,
    event.params._isLong ? LONG : SHORT,
    "GOHM"
  );
}
