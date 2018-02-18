import { component } from "babyioc";
import { GeneralComponent, IThing } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlanet, IScenery, IVegetable } from "./Things";

/**
 * Places and maintains floating vegetables.
 */
export class Vegetables<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     *
     */
    public addOppositePlanet(planet: IPlanet): void {
        const vegetable = this.gameStarter.things.add(this.gameStarter.things.names.vegetable);

        const midX = this.gameStarter.numberMaker.randomWithin(planet.left, planet.right);
        const midY = this.gameStarter.physics.getMidY(planet) > this.gameStarter.mapScreener.middleY
            ? this.gameStarter.numberMaker.randomWithin(
                vegetable.height / 2,
                planet.top - vegetable.height / 2)
            : this.gameStarter.numberMaker.randomWithin(
                planet.bottom + vegetable.height / 2,
                this.gameStarter.mapScreener.height - vegetable.height / 2);

        console.log({ midX, midY });

        this.gameStarter.physics.setMid(vegetable, midX, midY);
    }
}
