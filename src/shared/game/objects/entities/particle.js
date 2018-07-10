import GameObject from "./game-object.js";
import Vector from "../../../data/vector";

export default class Particle extends GameObject {

    constructor() {
        super();
        this.gravitable = false;
        this.maxVelocity = new Vector(0.5, 0.5);
        this.velocity = new Vector();
        this.acceleration = new Vector();
    }

    move(dt) {

    }

}