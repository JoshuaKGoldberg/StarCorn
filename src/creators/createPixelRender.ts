import { PixelRendr } from "pixelrendr";

/* tslint:disable max-line-length */

import { StarCorn } from "../StarCorn";

export const createPixelRender = (game: StarCorn) =>
    new PixelRendr({
        scale: 1,
        spriteWidth: "spritewidth",
        spriteHeight: "spriteheight",
        flipVert: "flip-vert",
        flipHoriz: "flipped",
        paletteDefault: [
            [0, 0, 0, 0],
            [255, 255, 255, 255],
            [0, 0, 0, 255],
            [199, 199, 192, 255],
            [128, 128, 128, 255],
        ],
        filters: {},
        library: {
            [game.things.names.scenery]: {
                [game.things.names.star]: "p[0,1]010111010",
            },
        },
    });
