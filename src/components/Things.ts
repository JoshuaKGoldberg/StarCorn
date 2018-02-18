import { component } from "babyioc";
import { GeneralComponent, IThing, Things as GameStartrThings } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { ThingNames } from "./things/ThingNames";

export interface IScenery extends IThing {
    onMaintain(thing: IScenery): void;
}

export interface IPlanet extends IThing {
    gravity: number;
}

export interface IVegetable extends IThing {
    onMaintain(thing: IVegetable): void;
}

export interface IPlayer extends IThing {
    speed: number;
}

/**
 * Names and upkeep functions for in-game Things.
 */
export class Things<TGameStartr extends StarCorn> extends GameStartrThings<TGameStartr> {
    @component(ThingNames)
    public readonly names: ThingNames<TGameStartr>;
}
