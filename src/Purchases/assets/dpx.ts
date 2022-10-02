import { handleSSOVPurchase } from "../handlers";
import { SSOVPurchase } from "../../../generated/HeartbeatSwaps/JonesSSOVCallV3Strategy";
import { CALL, PUT } from "../../constants";

export function handleCallPurchase(event: SSOVPurchase): void {
  handleSSOVPurchase(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    event.params._premium,
    event.params._totalFee,
    "DPX",
    CALL
  );
}

export function handlePutPurchase(event: SSOVPurchase): void {
  handleSSOVPurchase(
    event.block.timestamp,
    event.params._strikeIndex,
    event.params._epoch,
    event.params._amount,
    event.params._premium,
    event.params._totalFee,
    "DPX",
    PUT
  );
}
