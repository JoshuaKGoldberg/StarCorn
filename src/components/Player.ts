import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlanet, IPlayer, IVegetable } from "./Things";

/**
 * Maintains the player(s).
 */
export class Player<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     *
     */
    public static readonly acceleration = 0.035;

    /**
     *
     */
    public static readonly maximumSpeed = 7;

    /**
     *
     */
    public readonly movement = (thing: IPlayer): void => {
        if (thing.speed < Player.maximumSpeed) {
            thing.speed = Math.min(thing.speed + Player.acceleration, Player.maximumSpeed);
        }

        this.gameStarter.scrolling.scrollThing(thing, thing.speed);
        this.feelTheGravity(thing);

        if (thing.left < 0) {
            this.gameStarter.physics.shiftHoriz(thing, -thing.left);
        } else if (thing.right > this.gameStarter.mapScreener.width) {
            this.gameStarter.physics.shiftHoriz(thing, thing.right - this.gameStarter.mapScreener.width);
        }

        if (thing.top < 0) {
            this.gameStarter.physics.shiftVert(thing, -thing.top);
        } else if (thing.bottom > this.gameStarter.mapScreener.height) {
            this.gameStarter.physics.shiftVert(thing, this.gameStarter.mapScreener.height - thing.bottom);
        }

        this.gameStarter.sparkles.scatterSparklesAroundPlayer(thing);
    }

    private feelTheGravity(thing: IPlayer): void {
        let shiftX = 0;
        let shiftY = 0;

        for (const planet of this.gameStarter.groupHolder.getGroup(this.gameStarter.things.names.planet)) {
            const dx: number = this.gameStarter.physics.getMidX(planet) - this.gameStarter.physics.getMidX(thing);
            const dy: number = this.gameStarter.physics.getMidY(planet) - this.gameStarter.physics.getMidY(thing);
            const dTotal: number = Math.sqrt(dx * dx + dy * dy);

            if (dx > 0) {
                shiftX -= dx * 3.5 / dTotal;
            }

            shiftY -= dy * 7 / dTotal;
        }

        if (thing.invertGravity) {
            shiftX *= -1;
            shiftY *= -1;
        }

        this.gameStarter.physics.shiftBoth(thing, shiftX, shiftY);
    }
}
