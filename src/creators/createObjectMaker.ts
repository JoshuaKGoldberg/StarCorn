import { ObjectMakr } from "objectmakr";

import { StarCorn } from "../StarCorn";

export const createObjectMaker = (game: StarCorn): ObjectMakr =>
    new ObjectMakr({
        onMake: "onMake",
        indexMap: ["width", "height"],
        inheritance: {
            Quadrant: {},
            Map: {},
            Area: {},
            Location: {},
            Thing: {
                [game.things.names.scenery]: {
                    [game.things.names.star]: {},
                },
            },
        },
        properties: {
            Quadrant: {
                tolx: 0,
                toly: 0,
            },
            Map: {
                initialized: false,
            },
            Area: {
                background: "black",
            },
            Location: {
                entry: "Normal",
            },
            [game.things.names.thing]: {
                // Sizing
                width: 32,
                height: 32,
                // Placement
                alive: true,
                placed: false,
                maxquads: 16,
                // Sprites
                sprite: "",
                spriteType: "neither",
                scale: 1,
                offsetX: 0,
                offsetY: 0,
                // Movements
                movement: undefined,
                // Collisions
                tolTop: 0,
                tolRight: 0,
                tolBottom: 0,
                tolLeft: 0,
                // Triggered Functions
                onMake: game.things.process.bind(game.things),
            },
            [game.things.names.scenery]: {
                groupType: game.things.names.scenery,
            },
            [game.things.names.star]: {
                height: 3,
                width: 3,
                onMaintain: game.stars.maintainStar.bind(game.stars),
            },
        },
    });
