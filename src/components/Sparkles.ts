import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlayer, ISparkle, IThing } from "./Things";

/**
 * Scatters sparkles around players.
 */
export class Sparkles<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Screen distance between columns of stars.
     */
    public static readonly distanceBetweenColumns = 7;

    /**
     * Scatters stars randomly around a player and in a ring.
     */
    public scatterSparklesAroundPlayer(player: IPlayer): void {
        const randomQuantity = this.gameStarter.numberMaker.randomIntWithin(3, 14);
        const playerMidX = this.gameStarter.physics.getMidX(player);
        const playerMidY = this.gameStarter.physics.getMidY(player);
        const className = player.invertGravity ? "attract" : "repel";

        for (let i = 0; i < randomQuantity; i += 1) {
            const sparkleMidX = this.gameStarter.numberMaker.randomWithin(playerMidX - player.width / 2, playerMidX + player.width / 2);
            const sparkleMidY = this.gameStarter.numberMaker.randomWithin(playerMidY - player.height / 2, playerMidY + player.height / 2);

            this.addSparkle(sparkleMidX, sparkleMidY, className);
        }
    }

    /**
     * Regular Star maintenance for sparkling and looping its position.
     *
     * @param star   Star to maintain.
     */
    public readonly movement = (star: ISparkle): void => {
        if (star.right < 0 || star.opacity === 0) {
            this.gameStarter.physics.killNormal(star);
            return;
        }

        star.opacity -= this.gameStarter.numberMaker.randomWithin(0.007, 0.07);
        star.opacity = Math.max(star.opacity, 0);
    }

    private addSparkle(midX: number, midY: number, className: string) {
        const sparkle = this.gameStarter.objectMaker.make<ISparkle>(
            this.gameStarter.things.names.sparkle,
            {
                opacity: this.gameStarter.numberMaker.randomWithin(0.14, 1),
                scale: this.gameStarter.numberMaker.randomWithin(0.7, 3.5),
            });

        this.gameStarter.graphics.addClass(sparkle, className);
        this.gameStarter.things.add(sparkle);
        this.gameStarter.physics.setMid(sparkle, midX, midY);
    }
}
