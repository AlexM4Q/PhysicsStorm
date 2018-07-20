import Particle from "./physics/particle";
import Vector from "../../../data/vector";

export default class Bullet extends Particle {

    constructor(position, target) {
        super();
        this.color = "#ff0000";
        this.position = position;
        this.size = new Vector(2, 2);
        this.linearVelocity = new Vector(1, 1);
        this.direction = target.subtract(position).normalize;
    }

    move(dt) {
        super.move(dt);
        this.position = this.position.add(this.linearVelocity.multiply(this.direction).factor(dt));
    }

}