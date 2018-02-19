import { GroupHoldr } from "groupholdr";

import { IPlanet, IPlayer, ISparkle, IStar, IThing, IVegetable } from "../components/Things";
import { StarCorn } from "../StarCorn";

export interface IGroups {
    Planet: IPlanet;
    Player: IPlayer;
    Sparkle: ISparkle;
    Star: IStar;
    Vegetable: IVegetable;
    [i: string]: IThing;
}

export const createGroupHolder = (game: StarCorn) =>
    new GroupHoldr<IGroups>({
        groupNames: [
            game.things.names.sparkle,
            game.things.names.star,
            game.things.names.planet,
            game.things.names.vegetable,
            game.things.names.player,
        ],
        ...game.settings.components.groups,
    });
