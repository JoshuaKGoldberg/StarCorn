import { IThing } from "gamestartr";
import { PixelDrawr } from "pixeldrawr";

import { StarCorn } from "../StarCorn";

export const createPixelDrawer = (game: StarCorn) =>
    new PixelDrawr({
        boundingBox: game.mapScreener,
        canvas: game.canvas,
        createCanvas: (width: number, height: number): HTMLCanvasElement =>
            game.utilities.createCanvas(width, height),
        framerateSkip: 2,
        generateObjectKey: (thing: IThing): string =>
            game.graphics.generateThingKey(thing),
        pixelRender: game.pixelRender,
        spriteCacheCutoff: 2048,
        thingArrays: [
            game.groupHolder.getGroup(game.things.names.star),
            game.groupHolder.getGroup(game.things.names.sparkle),
            game.groupHolder.getGroup(game.things.names.planet),
            game.groupHolder.getGroup(game.things.names.vegetable),
            game.groupHolder.getGroup(game.things.names.player),
        ],
        ...game.settings.components.drawing,
    });
