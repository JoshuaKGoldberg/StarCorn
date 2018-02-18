import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";

/**
 * Scatters sparkling stars through the screen.
 */
export class Stars<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Screen distance between columns of stars.
     */
    public static readonly distanceBetweenColumns = 21;

    /**
     * Scatters stars randomly across the screen.
     */
    public scatterStars(): void {
        const distanceBetween = 21;
        const screenWidth: number = this.gameStarter.mapScreener.width;
        const starColumns: number = (screenWidth / distanceBetween) + 1;

        for (let left: number = -this.gameStarter.numberMaker.randomInt(starColumns); left < screenWidth; left += distanceBetween) {
            const top: number = this.gameStarter.numberMaker.randomIntWithin(-28, screenWidth);

            this.gameStarter.things.add(
                [
                    this.gameStarter.things.names.star,
                    {
                        scale: this.gameStarter.numberMaker.randomWithin(0.35, 1.75),
                        opacity: this.gameStarter.numberMaker.randomWithin(0.49, 1),
                    },
                ],
                left,
                top);
        }
    }
}
