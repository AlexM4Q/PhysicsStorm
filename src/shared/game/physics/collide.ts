import Vector2 from "../../data/vector2";
import RigidBody from "./rigid-body";

export default class Manifold {

    public get a(): RigidBody {
        return this._a;
    }

    public get b(): RigidBody {
        return this._b;
    }

    public get penetration(): Vector2 {
        return this._penetration;
    }

    constructor(private readonly _a: RigidBody, private readonly _b: RigidBody, private readonly _penetration: Vector2) {
    }

}