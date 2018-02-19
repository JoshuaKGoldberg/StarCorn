import { component } from "babyioc";
import { GeneralComponent, IThing as IGameStartrThing, Things as GameStartrThings } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { ThingNames } from "./things/ThingNames";

export interface IThing extends IGameStartrThing {
    onMaintain(thing: IThing): void;
}

export interface IPlanet extends IThing {
    gravity: number;
}

export type IScenery = IThing;

export interface IPlayer extends IThing {
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
