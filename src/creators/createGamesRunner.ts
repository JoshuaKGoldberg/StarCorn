import { GamesRunnr } from "gamesrunnr";
import { IThing } from "gamestartr";

import { StarCorn } from "../StarCorn";

/**
 * @param fsp   A generating StarCorn instance.
 * @returns Runner settings for the StarCorn instance.
 */
export const createGamesRunner = (game: StarCorn): GamesRunnr =>
    new GamesRunnr({
        interval: 1000 / 60,
        games: [
            (): void => {
                game.pixelDrawer.refillGlobalCanvas();
            },
            (): void => {
                game.maintenance.maintainGeneric(
                    game.groupHolder.getGroup(game.things.names.scenery));
            },
            (): void => {
                game.timeHandler.advance();
            },
        ],
    });
