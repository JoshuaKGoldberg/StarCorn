import { component } from "babyioc";
import { GeneralComponent, IThing as IGameStartrThing, Things as GameStartrThings } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { ThingNames } from "./things/ThingNames";

export interface IThing extends IGameStartrThing {
    /**
     * A Function to move during an upkeep event.
     */
    movement(thing: IThing): void;
}

export interface IPlanet extends IThing {
    gravity: number;
}

export type ISparkle = IThing;
export type IStar = IThing;

export interface IPlayer extends IThing {
    invertGravity: boolean;
    speed: number;
}

export type IVegetable = IThing;

/**
 * Names and upkeep functions for in-game Things.
 */
export class Things<TGameStartr extends StarCorn> extends GameStartrThings<TGameStartr> {
    @component(ThingNames)
    public readonly names: ThingNames<TGameStartr>;

    /**
     * Slight addition to the parent thingProcess Function. The Thing's hit
     * check type is cached immediately, and a default id is assigned if an id
     * isn't already present.
     *
     * @param thing   The Thing being processed.
     * @param title   What type Thing this is (the name of the class).
     * @remarks This is generally called as the onMake call in an ObjectMakr.
     */
    public process(thing: IThing, title: string): void {
        super.process(thing, title);

        // ThingHittr becomes very non-performant if functions aren't generated for
        // each Thing constructor (optimization does not respect prototypal inheritance, sadly).
        this.gameStarter.thingHitter.cacheChecksForType(thing.title, thing.groupType);
    }
}
