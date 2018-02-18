import { component } from "babyioc";
import { FlagSwappr, IFlagSwapprSettings } from "flagswappr";
import { GameStartr, IComponentSettings, IGameStartrConstructorSettings, IGameStartrSettings, IThing } from "gamestartr";
import { GroupHoldr } from "groupholdr";
import { ObjectMakr } from "objectmakr";
import { PixelDrawr } from "pixeldrawr";

import { GamesRunnr } from "gamesrunnr";
import { Maintenance } from "./components/Maintenance";
import { Stars } from "./components/Stars";
import { Things } from "./components/Things";
import { createGamesRunner } from "./creators/createGamesRunner";
import { createGroupHolder, IGroups } from "./creators/createGroupHolder";
import { createObjectMaker } from "./creators/createObjectMaker";
import { createPixelDrawer } from "./creators/createPixelDrawer";
import { PixelRendr } from "pixelrendr";
import { createPixelRender } from "./creators/createPixelRender";
import { QuadsKeepr } from "quadskeepr";
import { createQuadsKeeper } from "./creators/createQuadsKeeper";

/**
 * A free HTML5 remake of Nintendo's original Pokemon, expanded for the modern web.
 */
export class StarCorn extends GameStartr {
    /**
     * Screen and component reset settings.
     */
    public readonly settings: IGameStartrSettings;

    /**
     * Storage for separate group arrays of members with unique IDs.
     */
    @component(createGamesRunner)
    public readonly gamesRunner: GamesRunnr;

    /**
     * Storage for separate group arrays of members with unique IDs.
     */
    @component(createGroupHolder)
    public readonly groupHolder: GroupHoldr<IGroups>;

    /**
     * An abstract factory for dynamic attribute-based classes.
     */
    @component(createObjectMaker)
    public readonly objectMaker: ObjectMakr;

    /**
     * A real-time scene drawer for large amounts of PixelRendr sprites.
     */
    @component(createPixelDrawer)
    public readonly pixelDrawer: PixelDrawr;

    /**
     * Compresses images into text blobs in real time with fast cached lookups.
     */
    @component(createPixelRender)
    public readonly pixelRender: PixelRendr;

    /**
     * Adjustable quadrant-based collision detection.
     */
    @component(createQuadsKeeper)
    public readonly quadsKeeper: QuadsKeepr<IThing>;

    /**
     * Scatters sparkling stars through the screen.
     */
    @component(Maintenance)
    public readonly maintenance: Maintenance<this>;

    /**
     * Scatters sparkling stars through the screen.
     */
    @component(Stars)
    public readonly stars: Stars<this>;

    /**
     * Names and upkeep functions for in-game Things.
     */
    @component(Things)
    public readonly things: Things<this>;

    /**
     * Initializes a new instance of the StarCorn class.
     *
     * @param settings   Settings to be used for initialization.
     */
    public constructor(settings: IGameStartrConstructorSettings) {
        super(settings);

        this.stars.scatterStars();

        this.quadsKeeper.resetQuadrants();
        this.gamesRunner.play();
    }
}
