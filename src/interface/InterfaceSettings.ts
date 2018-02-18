import { GeneralComponent } from "gamestartr";
import { IPipe } from "inputwritr";
import { IAbsoluteSizeSchema, IMultiSelectSchema, IRelativeSizeSchema, IUserWrappr, IUserWrapprSettings, OptionType } from "userwrappr";

import { StarCorn } from "../StarCorn";

/**
 * Global scope around a game, such as a DOM window.
 */
export interface IGameWindow {
    /**
     * Adds an event listener to the window.
     */
    addEventListener: typeof window.addEventListener;

    /**
     * Reference to the window document.
     */
    document: {
        /**
         * Adds an event listener to the document.
         */
        addEventListener: typeof document.addEventListener;
    };

    /**
     * Game instance, once this has created it.
     */
    StarCorn?: StarCorn;

    /**
     * Removes an event listener from the window.
     */
    removeEventListener: typeof window.removeEventListener;
}

/**
 * Sizes the game is allowed to be, keyed by friendly name.
 */
export interface IGameSizes {
    [i: string]: IRelativeSizeSchema;
}

/**
 * Creates settings for an IUserWrappr that will create and wrap a FullScreenPokemon instance.
 */
export class InterfaceSettingsFactory {
    /**
     * Friendly name of the default game size.
     */
    public readonly defaultSize: string = "Large";

    /**
     * Sizes the game is allowed to be, keyed by friendly name.
     */
    public readonly sizes: IGameSizes = {
        GameBoy: {
            width: 320,
            height: 288,
        },
        NES: {
            width: 512,
            height: 464,
        },
        [this.defaultSize]: {
            width: "100%",
            height: "100%",
        },
    };

    /**
     * Keys that may be mapped to game inputs.
     */
    public readonly keys: string[] = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "up", "right", "down", "left",
        "backspace", "ctrl", "enter", "escape", "shift", "space",
    ];

    /**
     * Global scope around the game.
     */
    private readonly gameWindow: IGameWindow;

    /**
     * Game instance, once this has created it.
     */
    private game: StarCorn;

    /**
     * IUserWrappr instance this is creating interfaces for.
     */
    private userWrapper: IUserWrappr;

    /**
     * Whether InputWritr pipes have been initialized.
     */
    private initializedPipes = false;

    /**
     * Whether the page is known to be hidden.
     */
    private isPageHidden = false;

    /**
     * Initializes a new instance of the InterfaceSettings class.
     *
     * @param gameWindow   Global scope around the game interface, if not the global window.
     */
    public constructor(gameWindow: IGameWindow = window) {
        this.gameWindow = gameWindow;
    }

    /**
     * Creates settings for a game's IUserWrappr.
     *
     * @returns Settings for a game's IUserWrappr.
     */
    public createUserWrapprSettings(): IUserWrapprSettings {
        return {
            defaultSize: this.sizes[this.defaultSize],
            createContents: (size: IAbsoluteSizeSchema, userWrapper: IUserWrappr) => {
                this.gameWindow.StarCorn = this.game = new StarCorn(size);
                this.userWrapper = userWrapper;

                if (!this.initializedPipes) {
                    this.initializePipes();
                    this.initializedPipes = true;
                }

                return this.game.container;
            },
            menus: [
                {
                    options: [
                        {
                            getInitialValue: (): boolean => this.game.audioPlayer.getMuted(),
                            saveValue: (value: boolean): void => {
                                this.game.audioPlayer.setMuted(value);
                            },
                            title: "Mute",
                            type: OptionType.Boolean,
                        },
                        {
                            action: (): void => {
                                this.game.utilities.takeScreenshot(`StarCorn ${Date.now()}`);
                            },
                            title: "Screenshot",
                            type: OptionType.Action,
                        },
                        {
                            getInitialValue: (): string => "1x",
                            options: [".25x", ".5x", "1x", "2x", "5x", "10x"],
                            saveValue: (value: string): void => {
                                const multiplier = parseFloat(value.replace("x", ""));
                                this.game.gamesRunner.setInterval(multiplier * (1000 / 60));
                            },
                            title: "Speed",
                            type: OptionType.Select,
                        },
                        {
                            getInitialValue: () => this.defaultSize,
                            options: Object.keys(this.sizes),
                            saveValue: async (value: string): Promise<void> => {
                                await this.userWrapper.resetSize(this.sizes[value]);
                            },
                            title: "View Mode",
                            type: OptionType.Select,
                        },
                        {
                            getInitialValue: (): number => Math.round(this.game.audioPlayer.getVolume() * 100),
                            maximum: 100,
                            minimum: 0,
                            saveValue: (value: number): void => {
                                this.game.audioPlayer.setVolume(value / 100);
                            },
                            title: "Volume",
                            type: OptionType.Number,
                        },
                    ],
                    title: "Options",
                },
                {
                    options: ((controls: string[]): IMultiSelectSchema[] =>
                        controls.map((control: string): IMultiSelectSchema => ({
                            getInitialValue: (): string[] =>
                                this.game.inputWriter.aliasConverter
                                    .getAliasAsKeyStrings(control)
                                    .map((text: string): string => text.toLowerCase()),
                            options: this.keys,
                            saveValue: (newValue: string[], oldValue: string[]): void => {
                                this.game.inputWriter.switchAliasValues(control, oldValue, newValue);
                            },
                            selections: 2,
                            title: control,
                            type: OptionType.MultiSelect,
                        }))
                    )([]),
                    title: "Controls",
                },
            ],
            styles: {
                input: {
                    fontFamily: "Press Start",
                    minWidth: "117px",
                    padding: "3px",
                },
                inputButton: {
                    background: "#cc33ff",
                    cursor: "pointer",
                    fontFamily: "Press Start",
                    padding: "7px 3px",
                },
                inputButtonAction: {
                    padding: "11px 3px",
                    width: "100%",
                },
                inputButtonBoolean: {
                    padding: "7px 21px",
                },
                inputButtonOff: {
                    background: "#aa33cc",
                },
                inputSelect: {
                    minWidth: "35px",
                    padding: "3px 0",
                },
                option: {
                    alignItems: "center",
                    margin: "auto",
                    padding: "7px 0",
                    maxWidth: "calc(100% - 14px)",
                },
                options: {
                    left: "4px",
                    right: "4px",
                    width: "auto",
                    padding: "4px 3px 7px 3px",
                    boxShadow: [
                        "0 3px 7px black inset",
                        "0 0 0 4px #cc99ff",
                        "0 0 14px black",
                    ].join(", "),
                    background: "#990000",
                },
                optionsList: {
                    marginBottom: "7px",
                },
                menu: {
                    maxWidth: "385px",
                    minWidth: "280px",
                    padding: "7px",
                },
                menusInnerArea: {
                    background: "black",
                    color: "white",
                    fontFamily: "Press Start",
                    transition: "700ms color",
                },
                menusInnerAreaFake: {
                    color: "grey",
                },
            },
        };
    }

    /**
     * Reacts to the page becoming hidden by pausing the GameStartr.
     */
    private onPageHidden(): void {
        if (!this.game.gamesRunner.getPaused()) {
            this.isPageHidden = true;
            this.game.gamesRunner.pause();
        }
    }

    /**
     * Reacts to the page becoming visible by unpausing the GameStartr.
     */
    private onPageVisible(): void {
        if (this.isPageHidden) {
            this.isPageHidden = false;
            this.game.gamesRunner.play();
        }
    }

    /**
     * Adds InputWritr pipes as global event listeners.
     */
    private initializePipes(): void {
        // ...
    }

    /**
     * Handles a visibility change event by pausing or playing if necessary.
     */
    private readonly handleVisibilityChange = (): void => {
        switch (document.visibilityState) {
            case "hidden":
                this.onPageHidden();
                return;

            case "visible":
                this.onPageVisible();
                return;

            default:
                return;
        }
    }
}
