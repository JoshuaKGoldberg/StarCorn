import { GamesRunnr } from "gamesrunnr";
import { IThing } from "gamestartr";

import { StarCorn } from "../StarCorn";

/**
 * @param game   A generating StarCorn instance.
 * @returns Runner settings for the StarCorn instance.
 */
export const createGamesRunner = (game: StarCorn): GamesRunnr =>
    new GamesRunnr({
        interval: 1000 / 120,
        games: [
            (): void => {
                game.timeHandler.advance();

                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.player));
                game.maintenance.maintainGroupPhysicsAndCollisions(game.groupHolder.getGroup(game.things.names.player));

                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.planet));
                game.maintenance.maintainGroupPhysics(game.groupHolder.getGroup(game.things.names.planet));

                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.vegetable));
                game.maintenance.maintainGroupPhysics(game.groupHolder.getGroup(game.things.names.vegetable));

                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.star));
                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.sparkle));

                game.pixelDrawer.refillGlobalCanvas();
            },
        ],
    });
