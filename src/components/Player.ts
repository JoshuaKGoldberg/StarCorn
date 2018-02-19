import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlayer, IVegetable } from "./Things";

/**
 * Maintains the player(s).
 */
export class Player<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     *
     */
    public readonly maintainPlayer = (thing: IPlayer): void => {
        this.gameStarter.scrolling.scrollThing(thing, thing.speed);
    }
}
