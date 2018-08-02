import Particle from "./physics/particle";
import Vector from "../../data/vector";
import Box from "./shapes/box";

export default class Bullet extends Particle<Box> {

    private direction: Vector;

    constructor(position: Vector, target: Vector) {
        super(new Box(new Vector(2, 2)));
        this.color = "#ff0000";
        this.position = position;
        this.linearVelocity = new Vector(1, 1);
        this.direction = target.subtract(position).normalize;
    }

    public move(dt): void {
        this.position = this.position.add(this.linearVelocity.multiply(this.direction).factor(dt));
    }

    public draw(context): void {
    }

}