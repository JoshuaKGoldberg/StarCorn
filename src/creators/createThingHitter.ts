import { ThingHittr } from "thinghittr";

import { StarCorn } from "../StarCorn";

export const createThingHitter = (game: StarCorn): ThingHittr =>
    new ThingHittr({
        globalCheckGenerators: {
            Planet: game.collisions.generateCanThingCollide,
            Player: game.collisions.generateCanThingCollide,
            Vegetable: game.collisions.generateCanThingCollide,
        },
        hitCheckGenerators: {
            Player: {
                Planet: game.collisions.generateIsPlayerTouchingPlanet,
                Vegetable: game.collisions.generateIsPlayerTouchingVegetable,
            },
        },
        hitCallbackGenerators: {
            Player: {
                Planet: game.collisions.generateHitPlayerPlanet,
                Vegetable: game.collisions.generateHitPlayerVegetable,
            },
        },
    });
