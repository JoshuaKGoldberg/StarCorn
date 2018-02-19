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
                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.player));
                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.scenery));
                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.planet));
                game.maintenance.maintainGenericGroup(game.groupHolder.getGroup(game.things.names.vegetable));
                game.timeHandler.advance();
                game.pixelDrawer.refillGlobalCanvas();
            },
        ],
    });
