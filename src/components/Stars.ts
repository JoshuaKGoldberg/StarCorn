import { component } from "babyioc";
import { GeneralComponent, IThing } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IScenery } from "./Things";

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
        const distanceBetween = 14;
        const screenWidth: number = this.gameStarter.mapScreener.width;
        const starColumns: number = (screenWidth / distanceBetween) + 1;
        const stars: IScenery[] = [];

        for (let left: number = -this.gameStarter.numberMaker.randomInt(starColumns); left < screenWidth; left += distanceBetween) {
            const top: number = this.gameStarter.numberMaker.randomIntWithin(-28, screenWidth);
            const star = this.gameStarter.objectMaker.make<IScenery>(
                this.gameStarter.things.names.star,
                {
                    opacity: this.gameStarter.numberMaker.randomWithin(0.49, 1),
                    scale: this.gameStarter.numberMaker.randomWithin(0.35, 2.1),
                });

            this.gameStarter.things.add(star, left, top);
            stars.push(star);
        }
    }

    public maintainStar(star: IScenery): void {
        if (star.bottom < 0) {
            this.gameStarter.physics.setTop(star, this.gameStarter.mapScreener.bottom);
        } else if (star.top > this.gameStarter.mapScreener.bottom) {
            this.gameStarter.physics.setBottom(star, 0);
        }

        if (star.right < 0) {
            this.gameStarter.physics.setLeft(star, this.gameStarter.mapScreener.right);
        } else if (star.left > this.gameStarter.mapScreener.right) {
            this.gameStarter.physics.setRight(star, 0);
        }

        star.opacity += this.gameStarter.numberMaker.randomWithin(-0.035, 0.035);
        star.opacity = Math.max(Math.min(star.opacity, 1), 0.14);
    }
}
