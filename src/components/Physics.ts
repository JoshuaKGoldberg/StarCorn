import { Physics as PhysicsBase } from "gamestartr";

import { StarCorn } from "../StarCorn";
import { IThing } from "./Things";

/**
 * Physics functions to move Things around.
 */
export class Physics<TGameStartr extends StarCorn> extends PhysicsBase<TGameStartr> {
    public getDistanceBetweenCenters(thing: IThing, other: IThing): number {
        const a = Math.abs(this.getMidX(thing) - this.getMidX(other));
        const b = Math.abs(this.getMidY(thing) - this.getMidY(other));

        return Math.sqrt(a * a + b * b);
    }
}
