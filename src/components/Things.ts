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

export type IScenery = IThing;

export interface IPlayer extends IThing {
    invertGravity:: boolean;
    speed: number;
}

export type IVegetable = IThing;

/**
 * Names and upkeep functions for in-game Things.
 */
export class Things<TGameStartr extends StarCorn> extends GameStartrThings<TGameStartr> {
    @component(ThingNames)
    public readonly names: ThingNames<TGameStartr>;
}
