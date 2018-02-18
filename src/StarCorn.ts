import { component } from "babyioc";
import { FlagSwappr, IFlagSwapprSettings } from "flagswappr";
import { GameStartr, IComponentSettings, IGameStartrConstructorSettings, IGameStartrSettings } from "gamestartr";

/**
 * A free HTML5 remake of Nintendo's original Pokemon, expanded for the modern web.
 */
export class StarCorn extends GameStartr {
    /**
     * Screen and component reset settings.
     */
    public readonly settings: IGameStartrSettings;
}
