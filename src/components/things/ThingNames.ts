import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../../StarCorn";

/**
 * Static names of in-game Things.
 */
export class ThingNames<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    public readonly quadrant = "Quadrant";
    public readonly scenery = "Scenery";
    public readonly star = "Star";
    public readonly thing = "Thing";
}
