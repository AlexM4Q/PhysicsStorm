import Particle from "./particle";
import Vector from "../../data/vector";

export default class Bullet extends Particle {

    constructor(position, destination) {
        super();
        this.color = "#ff0000";
        this.position = position;
        this.size = new Vector(2, 2);
        this.velocity = new Vector(1, 1);
        this.direction = destination.subtract(position).normalize;
    }


    move(dt) {
        super.move(dt);
        this.position = this.position.add(this.velocity.multiply(this.direction).factor(dt));
    }
}