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
        const planet = this.gameStarter.things.add(this.gameStarter.things.names.planet) as IPlanet;
        const midY = this.gameStarter.numberMaker.randomBoolean()
            ? this.gameStarter.numberMaker.randomWithin(
                -planet.height * 0.33,
                0)
            : this.gameStarter.numberMaker.randomWithin(
                this.gameStarter.mapScreener.height,
                this.gameStarter.mapScreener.height + planet.height * 0.33);

        this.gameStarter.physics.setLeft(planet, planet.width + this.gameStarter.mapScreener.width);
        this.gameStarter.physics.setMidY(planet, midY);

        this.gameStarter.vegetables.addOppositePlanet(planet as IPlanet);
        return planet;
    }

    public readonly movement = (thing: IPlanet): void => {
        if (thing.right > -thing.width) {
            return;
        }

        this.gameStarter.physics.killNormal(thing);
        this.addPlanetAtEdge();
    }
}
