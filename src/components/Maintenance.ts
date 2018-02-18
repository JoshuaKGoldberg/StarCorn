import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IScenery } from "./Things";

/**
 * Maintains Things during GamesRunnr ticks.
 */
export class Maintenance<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Regular upkeep maintenance for Scenery Things.
     *
     * @param things   Group of Scenery to maintain.
     */
    public maintainScenery(things: IScenery[]): void {
        for (const thing of things) {
            thing.onMaintain(thing);
        }
    }
}
