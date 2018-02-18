import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../../StarCorn";

/**
 * Static names of in-game Things.
 */
export class ThingNames<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    public readonly planet = "Planet";
    public readonly player = "Player";
    public readonly quadrant = "Quadrant";
    public readonly scenery = "Scenery";
    public readonly star = "Star";
    public readonly thing = "Thing";
    public readonly vegetable = "Vegetable";
}
