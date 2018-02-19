import { InputWritr } from "inputwritr";

import { StarCorn } from "../StarCorn";

export const createInputWriter = (game: StarCorn): InputWritr =>
    new InputWritr({
        aliases: {
            enter: [13, 32], // enter, space
        },
        triggers: {
            onkeydown: {
                enter: game.input.invertGravity,
            },
        },
    });
