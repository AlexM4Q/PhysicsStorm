import Particle from "./physics/particle";
import Vector from "../../data/vector";
import Box from "./shapes/box";
import Updatable from "./base/updatable";

export default class Bullet extends Particle implements Updatable<Bullet> {

    private direction: Vector;

    constructor(position: Vector, target: Vector) {
        super(new Box(position, new Vector(2, 2)));
        this.color = "#ff0000";
        this.position = position;
        this.linearVelocity = new Vector(1, 1);
        this.direction = target.subtract(position).normalize;
    }

    public step(dt: number): void {
        this.position = this.position.add(this.linearVelocity.multiply(this.direction).factor(dt));
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        this._shape.draw(canvasContext);
    }

    public updateBy(bullet: Bullet): void {
        super.updateBy(bullet);
    }

}