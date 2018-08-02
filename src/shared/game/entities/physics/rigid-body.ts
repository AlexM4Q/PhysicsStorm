import Particle from "./particle";
import {g} from "../../../constants";
import Vector from "../../../data/vector";
import Shape from "../shapes/shape";
import {injectable, unmanaged} from "inversify";

@injectable()
export default abstract class RigidBody<S extends Shape> extends Particle<S> {

    protected mass: number = 1;
    protected torque: number = 0;
    protected inertia: number = 0;
    protected angularVelocity: number = 0;
    protected angle: number = 0;

    protected constructor(@unmanaged() shape: S) {
        super(shape);
    }

    public move(dt): void {
        const force = new Vector(0, this.mass * g);
        const acceleration = force.factor(1 / this.mass);

        this.linearVelocity = this.linearVelocity.add(acceleration.factor(dt));
        this.position = this.position.add(this.linearVelocity.factor(dt));

        this.torque = this.shape.torque(force);
        this.inertia = this.shape.inertia(this.mass);

        this.angularVelocity += this.torque / this.inertia * dt;
        this.angle += this.angularVelocity * dt;
    }

}