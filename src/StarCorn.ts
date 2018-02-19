import { component } from "babyioc";
import { FlagSwappr, IFlagSwapprSettings } from "flagswappr";
import { GameStartr, IComponentSettings, IGameStartrConstructorSettings, IGameStartrSettings, IThing } from "gamestartr";
import { GroupHoldr } from "groupholdr";
import { ObjectMakr } from "objectmakr";
import { PixelDrawr } from "pixeldrawr";

import { GamesRunnr } from "gamesrunnr";
import { InputWritr } from "inputwritr";
import { PixelRendr } from "pixelrendr";
import { QuadsKeepr } from "quadskeepr";
import { Input } from "./components/Input";
import { Maintenance } from "./components/Maintenance";
import { Planets } from "./components/Planets";
import { Player } from "./components/Player";
import { Stars } from "./components/Stars";
import { Starting } from "./components/Starting";
import { IPlanet, Things } from "./components/Things";
import { Vegetables } from "./components/Vegetables";
import { createGamesRunner } from "./creators/createGamesRunner";
import { createGroupHolder, IGroups } from "./creators/createGroupHolder";
import { createInputWriter } from "./creators/createInputWriter";
import { createObjectMaker } from "./creators/createObjectMaker";
import { createPixelDrawer } from "./creators/createPixelDrawer";
import { createPixelRender } from "./creators/createPixelRender";
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
     * Bridges input events to known actions.
     */
    @component(createInputWriter)
    public readonly inputWriter: InputWritr;

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
     * Receives input events.
     */
    @component(Input)
    public readonly input: Input<this>;

    /**
     * Maintains Things during GamesRunnr ticks.
     */
    @component(Maintenance)
    public readonly maintenance: Maintenance<this>;

    /**
     * Scatters sparkling stars through the screen.
     */
    @component(Planets)
    public readonly planets: Planets<this>;

    /**
     * Maintains the player(s).
     */
    @component(Player)
    public readonly player: Player<this>;

    /**
     * Scatters sparkling stars through the screen.
     */
    @component(Stars)
    public readonly stars: Stars<this>;

    /**
     * Starts a player flying through the sky.
     */
    @component(Starting)
    public readonly starting: Starting<this>;

    /**
     * Names and upkeep functions for in-game Things.
     */
    @component(Things)
    public readonly things: Things<this>;

    /**
     * Places and maintains floating vegetables.
     */
    @component(Vegetables)
    public readonly vegetables: Vegetables<this>;

    /**
     * Initializes a new instance of the StarCorn class.
     *
     * @param settings   Settings to be used for initialization.
     */
    public constructor(settings: IGameStartrConstructorSettings) {
        super(settings);

        this.quadsKeeper.resetQuadrants();
        this.pixelDrawer.setBackground("black");
        this.mapScreener.clearScreen();

        this.starting.start();

        this.gamesRunner.play();
    }
}
