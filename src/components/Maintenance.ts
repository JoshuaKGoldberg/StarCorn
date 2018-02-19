import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IThing } from "./Things";

/**
 * Maintains Things during GamesRunnr ticks.
 */
export class Maintenance<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Regular upkeep maintenance for general Things.
     *
     * @param things   Group of Things to maintain.
     */
    public maintainGenericGroup(things: IThing[]): void {
        for (let i = 0; i < things.length; i += 1) {
            if (!things[i].alive) {
                things.splice(i, 1);
                i -= 1;
                continue;
            }

            things[i].movement(things[i]);
        }
    }
}
