import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlanet, IPlayer, IVegetable } from "./Things";

/**
 * Receives input events.
 */
export class Input<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    public readonly invertGravity = (event: Event): void => {
        event.preventDefault();

        for (const thing of this.gameStarter.groupHolder.getGroup(this.gameStarter.things.names.player)) {
            thing.invertGravity = !thing.invertGravity;
        }
    }
}
