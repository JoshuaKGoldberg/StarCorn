import { IThing } from "gamestartr";
import { IQuadrant, QuadsKeepr } from "quadskeepr";

import { StarCorn } from "../StarCorn";

export const createQuadsKeeper = (game: StarCorn) => {
    const quadrantWidth: number = game.settings.width / 6;
    const quadrantHeight: number = game.settings.height / 6;

    return new QuadsKeepr<any>({
        quadrantFactory: (): IQuadrant<IThing> =>
            game.objectMaker.make<IQuadrant<IThing>>(game.things.names.quadrant),
        quadrantWidth,
        quadrantHeight,
        numRows: 5,
        numCols: 6,
        groupNames: [],
        startLeft: -quadrantWidth,
        startTop: -quadrantHeight,
        onAdd: (direction: string, top: number, right: number, bottom: number, left: number): void => {
            game.maps.onAreaSpawn(direction, top, right, bottom, left);
        },
        onRemove: (direction: string, top: number, right: number, bottom: number, left: number): void => {
            game.maps.onAreaUnspawn(direction, top, right, bottom, left);
        },
        ...game.settings.components.quadrants,
    });
};
