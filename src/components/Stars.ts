import { component } from "babyioc";
import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IStar, IThing } from "./Things";

/**
 * Scatters sparkling stars through the screen.
 */
export class Stars<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Screen distance between columns of stars.
     */
    public static readonly distanceBetweenColumns = 7;

    /**
     * Scatters stars randomly across the screen.
     */
    public scatterStars(): void {
        const screenHeight: number = this.gameStarter.mapScreener.height;
        const screenWidth: number = this.gameStarter.mapScreener.width;
        const starColumns: number = screenWidth / Stars.distanceBetweenColumns;

        for (
            let midX: number = -this.gameStarter.numberMaker.randomInt(starColumns);
            midX < screenWidth;
            midX += Stars.distanceBetweenColumns
        ) {
            const midY = this.gameStarter.numberMaker.randomIntWithin(0, screenHeight);
            const star = this.gameStarter.objectMaker.make<IStar>(
                this.gameStarter.things.names.star,
                {
                    opacity: this.gameStarter.numberMaker.randomWithin(0.49, 1),
                    parallaxHoriz: this.gameStarter.numberMaker.randomWithin(0.14, 0.21),
                    parallaxVert: this.gameStarter.numberMaker.randomWithin(0.14, 0.21),
                    scale: this.gameStarter.numberMaker.randomWithin(0.35, 2.1),
                });

            this.gameStarter.things.add(star);
            this.gameStarter.physics.setMid(star, midX, midY);
        }
    }

    /**
     * Regular Star maintenance for sparkling and looping its position.
     *
     * @param star   Star to maintain.
     */
    public readonly movement = (star: IStar): void => {
        if (star.right < 0) {
            this.gameStarter.physics.setLeft(
                star,
                this.gameStarter.mapScreener.width - star.right);
        }

        star.opacity += this.gameStarter.numberMaker.randomWithin(-0.035, 0.035);
        star.opacity = Math.max(Math.min(star.opacity, 1), 0.14);
    }

    /**
     * Adds a color class to all stars, then removes it.
     *
     * @param color   Color to add to stars.
     */
    public flickerColorOn(color: string): void {
        for (const star of (this.gameStarter.groupHolder.getGroup(this.gameStarter.things.names.star))) {
            this.gameStarter.graphics.addClass(star, color);
        }

        this.gameStarter.timeHandler.addEvent(this.flickerColorOff, 35, color);
    }

    /**
     * Removes a color class from all stars.
     *
     * @param color   Color to remove from the stars.
     */
    private readonly flickerColorOff = (color: string): void => {
        for (const star of (this.gameStarter.groupHolder.getGroup(this.gameStarter.things.names.star))) {
            this.gameStarter.graphics.removeClass(star, color);
        }
    }
}
