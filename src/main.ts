import { createStarCornInterface } from "./index";

const container = document.getElementById("game")!;

createStarCornInterface(container)
    .catch((error: Error): void => {
        console.error("An error happened while trying to instantiate StarCorn!");
        console.error(error);
    });
