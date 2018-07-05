import Vector from "../../data/vector";

export default class Player {

    constructor() {
        this.controllable = true;
        this.size = new Vector(5, 5);
        this.position = new Vector(75, 75);
        this.velocity = new Vector();
        this.maxVelocity = new Vector(0.5, 0.5);
        this.acceleration = new Vector();
    }

}