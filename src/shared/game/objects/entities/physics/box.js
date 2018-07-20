import Vector from "../../../../data/vector";
import RigidBody from "./rigid-body";

export default class Box extends RigidBody {

    constructor() {
        super();
        this.size = new Vector(5, 5);
        this.inertia = this.mass * (this.size.x * this.size.x + this.size.y * this.size.y) / 12;
    }

}