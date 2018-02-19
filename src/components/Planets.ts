import { component } from "babyioc";
import { GeneralComponent, IThing } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlanet, IScenery } from "./Things";

/**
 * Places planets at random positions.
 */
export class Planets<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     *
     */
    public addPlanetAtEdge(): IPlanet {
        const midY = this.gameStarter.numberMaker.randomWithin(
            0,
            this.gameStarter.mapScreener.bottom);

        const planet = this.gameStarter.things.add(this.gameStarter.things.names.planet) as IPlanet;

        this.gameStarter.physics.setLeft(planet, this.gameStarter.mapScreener.width);
        this.gameStarter.physics.setMidY(planet, midY);

        this.gameStarter.vegetables.addOppositePlanet(planet as IPlanet);
        return planet;
    }

    public readonly maintainPlanet = (thing: IPlanet): void => {
        if (thing.right > 0) {
            return;
        }

        this.gameStarter.physics.killNormal(thing);
        this.addPlanetAtEdge();
    }
}
