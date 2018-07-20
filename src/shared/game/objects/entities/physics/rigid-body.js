import Particle from "./particle";
import {g} from "../../../../constants";
import Vector from "../../../../data/vector";

export default class RigidBody extends Particle {

    constructor() {
        super();
        this.mass = 1;
        this.angle = 0;
        this.angularVelocity = 0;
        this.torque = 0;
        this.inertia = 0;
    }

    move(dt) {
        super.move(dt);
        const force = new Vector(0, this.mass * g);
        const acceleration = force.factor(1 / this.mass);
        this.linearVelocity = this.linearVelocity.add(acceleration.factor(dt));
        this.position = this.position.add(this.linearVelocity.factor(dt));

        this.torque = force.y * this.size.x / 2 - force.x * this.size.y;
        this.angularVelocity += this.torque / this.inertia * dt;
        this.angle += this.angularVelocity * dt;
    }

}