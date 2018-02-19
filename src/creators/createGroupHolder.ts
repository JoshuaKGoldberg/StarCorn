import { GroupHoldr } from "groupholdr";

import { IPlanet, IPlayer, IScenery, IThing, IVegetable } from "../components/Things";
import { StarCorn } from "../StarCorn";

export interface IGroups {
    Planet: IPlanet;
    Player: IPlayer;
    Scenery: IScenery;
    Vegetable: IVegetable;
    [i: string]: IThing;
}

export const createGroupHolder = (game: StarCorn) =>
    new GroupHoldr<IGroups>({
        groupNames: [
            game.things.names.scenery,
            game.things.names.planet,
            game.things.names.vegetable,
            game.things.names.player,
        ],
        ...game.settings.components.groups,
    });
