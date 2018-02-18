import { UserWrappr } from "userwrappr";

import { InterfaceSettingsFactory } from "./InterfaceSettings";

/**
 * Creates a UserWrappr interface around an StarCorn game.
 *
 * @param container   HTML element to create within.
 * @returns A Promise for creating the game interface.
 */
export const createStarCornInterface = async (container: HTMLElement): Promise<void> =>
    new UserWrappr(new InterfaceSettingsFactory().createUserWrapprSettings())
        .createDisplay(container);
