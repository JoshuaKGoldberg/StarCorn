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
            [0, 210, 255, 255], // blue
            [255, 133, 0, 255], // orange
        ],
        filters: {},
        library: {
            [game.things.names.sparkle]: {
                attract: "p[5]0",
                normal: "p[1]0",
                repel: "p[6]0",
            },
            [game.things.names.star]: {
                attract: "p[0,5]010111010",
                normal: "p[0,1]010111010",
                repel: "p[0,6]010111010",
            },
            [game.things.names.planet]: "p[0,3]x165536,",
            [game.things.names.player]: "p[0,3]x14096,",
            [game.things.names.vegetable]: "p[0,3]x12048,",
        },
    });
