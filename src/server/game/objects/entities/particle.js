import GameObject from "../../../../shared/data/game-object.js";
import Vector from "../../../../shared/data/vector";

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