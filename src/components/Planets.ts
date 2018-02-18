import { component } from "babyioc";
import { GeneralComponent, IThing } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlanet, IScenery } from "./Things";

/**
 * Scatters sparkling stars through the screen.
 */
export class Stars<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {

    /**
     *
     */
    public placePlanet(x: number, y: number): void {

    }

    /**
     * Regular Star maintenance for sparkling and looping its position.
     *
     * @param star   Star to maintain.
     */
    public maintainPlanet(planet: IPlanet): void {

    }
}
