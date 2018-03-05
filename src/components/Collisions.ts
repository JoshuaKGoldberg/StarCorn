import { GeneralComponent } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IPlanet, IPlayer, IThing, IVegetable } from "./Things";

/**
 * ThingHittr collision function generators.
 */
export class Collisions<TGameStartr extends StarCorn> extends GeneralComponent<TGameStartr> {
    /**
     * Function generator for the generic canThingCollide checker.
     *
     * @returns A Function that generates a canThingCollide checker.
     */
    public generateCanThingCollide = (): (thing: IThing) => boolean =>
        /**
         * Generic checker for canCollide. This just returns if the Thing is alive.
         *
         * @param thing
         * @returns Whether the thing can collide.
         */
        (thing: IThing): boolean => thing.alive

    /**
     * Function generator for the generic generateIsPlayerTouchingPlanet checker.
     *
     * @returns A Function that generates generateIsPlayerTouchingPlanet.
     */
    public generateIsPlayerTouchingPlanet = (): (thing: IPlayer, other: IPlanet) => boolean =>
        /**
         * Generic checker for whether two characters are touching each other.
         * This checks to see if either has the nocollide flag, or if they're
         * overlapping, respecting tolerances.
         *
         * @param thing
         * @param other
         * @returns Whether thing is touching other.
         */
        (thing: IPlayer, other: IPlanet): boolean => (
            this.gameStarter.physics.getDistanceBetweenCenters(thing, other) < (thing.width + other.width / 2))

    /**
     * Function generator for the generic generateIsPlayerTouchingVegetable checker.
     *
     * @returns A Function that generates generateIsPlayerTouchingVegetable.
     */
    public generateIsPlayerTouchingVegetable = (): (thing: IPlayer, other: IVegetable) => boolean =>
        /**
         * Generic checker for whether two characters are touching each other.
         * This checks to see if either has the nocollide flag, or if they're
         * overlapping, respecting tolerances.
         *
         * @param thing
         * @param other
         * @returns Whether thing is touching other.
         */
        (thing: IPlayer, other: IVegetable): boolean => (
            this.gameStarter.physics.getDistanceBetweenCenters(thing, other) < (thing.width + other.width / 2))

    /**
     * Function generator for the generic hitPlayerPlanet callback.
     *
     * @returns A Function that generates hitPlayerPlanet.
     */
    public generateHitPlayerPlanet = (): (thing: IPlayer, other: IPlanet) => void =>
        /**
         * Generic callback for when a Player touches a Planet.
         *
         * @param thing
         * @param other
         * @returns Whether thing is hitting other.
         */
        (thing: IPlayer, other: IVegetable): void => {
            thing.opacity = 0.35;
        }

    /**
     * Function generator for the generic hitPlayerVegetable callback.
     *
     * @returns A Function that generates hitPlayerVegetable.
     */
    public generateHitPlayerVegetable = (): (thing: IPlayer, other: IVegetable) => void =>
        /**
         * Generic callback for when a Player touches a Vegetable.
         *
         * @param thing
         * @param other
         * @returns Whether thing is hitting other.
         */
        (thing: IPlayer, other: IVegetable): void => {
            this.gameStarter.physics.killNormal(other);
        }
}
