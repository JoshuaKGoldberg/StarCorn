import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlanet, IPlayer, IThing } from "./Things";

/**
 * Starts a player flying through the sky.
 */
export class Starting<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Regular Star maintenance for sparkling and looping its position.
     *
     * @param star   Star to maintain.
     */
    public start(): void {
        const player = this.gameStarter.objectMaker.make<IPlayer>(
            this.gameStarter.things.names.player,
            {
                speed: 7,
            });

        this.gameStarter.things.add(player);
        this.gameStarter.physics.setLeft(player, 0);
        this.gameStarter.physics.setMidY(player, this.gameStarter.mapScreener.height / 2);

        this.gameStarter.planets.addPlanetAtEdge();
    }
}
