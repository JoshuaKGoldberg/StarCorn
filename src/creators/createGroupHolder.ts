import { IThing } from "gamestartr";
import { GroupHoldr } from "groupholdr";

import { StarCorn } from "../StarCorn";

export interface IGroups {
    Scenery: IThing;
    [i: string]: IThing;
}

export const createGroupHolder = (game: StarCorn) =>
    new GroupHoldr<IGroups>({
        groupNames: [
            game.things.names.scenery,
        ],
        ...game.settings.components.groups,
    });
