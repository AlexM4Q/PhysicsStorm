import Vector2 from "../../data/vector2";
import Box from "../shapes/box";
import Updatable from "../base/updatable";
import RigidBody from "../physics/rigid-body";
import {METAL} from "../material/materials";

export default class Bullet extends RigidBody implements Updatable<Bullet> {

    private direction: Vector2;

    public constructor(position: Vector2, target: Vector2) {
        super(new Box(position, new Vector2(2, 2)), METAL);
        this.color = "#ff0000";
        this.linearVelocity = new Vector2(1, 1);
        this.direction = target.subtract(position).normalized;
    }

    public step(dt: number): void {
        this.position = this.position.add(this.linearVelocity.multiply(this.direction).factor(dt));
    }

}