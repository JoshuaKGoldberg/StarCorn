import { IThing } from "gamestartr";
import { GroupHoldr } from "groupholdr";

import { IScenery } from "../components/Things";
import { StarCorn } from "../StarCorn";

export interface IGroups {
    Scenery: IScenery;
    [i: string]: IThing;
}

export const createGroupHolder = (game: StarCorn) =>
    new GroupHoldr<IGroups>({
        groupNames: [
            game.things.names.scenery,
        ],
        ...game.settings.components.groups,
    });
