import { ObjectMakr } from "objectmakr";

import { StarCorn } from "../StarCorn";

export const createObjectMaker = (game: StarCorn): ObjectMakr =>
    new ObjectMakr({
        onMake: "onMake",
        inheritance: {
            Quadrant: {},
            Map: {},
            Area: {},
            Location: {},
            Thing: {
                [game.things.names.scenery]: {
                    [game.things.names.star]: {},
                },
                [game.things.names.planet]: {},
                [game.things.names.player]: {},
                [game.things.names.vegetable]: {},
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
            // Scenery
            [game.things.names.scenery]: {
                groupType: game.things.names.scenery,
            },
            [game.things.names.star]: {
                height: 3,
                width: 3,
                movement: game.stars.movement,
            },
            // Planets
            [game.things.names.planet]: {
                height: 256,
                width: 256,
                groupType: game.things.names.planet,
                movement: game.planets.movement,
            },
            // Player
            [game.things.names.player]: {
                height: 64,
                width: 64,
                groupType: game.things.names.player,
                invertGravity: false,
                movement: game.player.movement,
            },
            // Vegetables
            [game.things.names.vegetable]: {
                height: 48,
                width: 48,
                groupType: game.things.names.vegetable,
                movement: game.vegetables.movement,
            },
        },
    });
