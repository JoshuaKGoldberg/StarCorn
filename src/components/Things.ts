import { component } from "babyioc";
import { GeneralComponent, Things as GameStartrThings } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { ThingNames } from "./things/ThingNames";

/**
 * Names and upkeep functions for in-game Things.
 */
export class Things<TGameStartr extends StarCorn> extends GameStartrThings<TGameStartr> {
    @component(ThingNames)
    public readonly names: ThingNames<TGameStartr>;
}
