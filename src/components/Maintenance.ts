import { GeneralComponent, IThing } from "gamestartr";

import { StarCorn } from "../StarCorn";

/**
 * Maintains Things during GamesRunnr ticks.
 */
export class Maintenance<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Generic maintenance Function for a group of Things. For each Thing, if
     * it isn't alive, it's removed from the group.
     *
     * @param things   Group of Things to maintain.
     */
    public maintainGeneric(things: IThing[]): void {
        for (let i = 0; i < things.length; i += 1) {
            if (!things[i].alive) {
                this.gameStarter.utilities.arrayDeleteThing(things[i], things, i);
                i -= 1;
            }
        }
    }
}
