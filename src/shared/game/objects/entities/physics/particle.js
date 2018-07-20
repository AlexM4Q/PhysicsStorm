import GameObject from "../game-object.js";
import Vector from "../../../../data/vector";

export default class Particle extends GameObject {

    constructor() {
        super();
        this.linearVelocity = new Vector();
    }

    move(dt) {
    }

}