import Particle from "./particle";
import {g} from "../../constants";
import Vector2 from "../../data/vector2";
import Shape from "../shapes/shape";
import {injectable, unmanaged} from "inversify";
import Updatable from "../base/updatable";
import MassData from "./mass-data";
import Material from "../material/material";

@injectable()
export default abstract class RigidBody extends Particle implements Updatable<RigidBody> {

    public _force: Vector2;
    protected _material: Material;
    protected _massData: MassData;
    protected torque: number = 0;
    protected angularVelocity: number = 0;
    protected angle: number = 0;

    protected constructor(@unmanaged() shape: Shape, @unmanaged() material: Material, @unmanaged() isStatic: boolean = false) {
        super(shape, isStatic);

        if (this.isStatic) {
            return;
        }

        this._force = Vector2.ZERO;
        this._material = material;

        const mass = shape.square() * material.density;
        const inertia = shape.inertia(mass);
        this._massData = new MassData(mass, inertia);
    }

    public addForce(force: Vector2): void {
        if (this.isStatic) {
            return;
        }

        this._force = this._force.add(force);
    }

    public step(dt: number): void {
        if (this.isStatic) {
            return;
        }

        const force = new Vector2(
            this._force.x,
            this._force.y + this._massData.mass * g
        );

        this.linearVelocity = new Vector2(
            this.linearVelocity.x + dt * force.x * this._massData.inverse_mass,
            this.linearVelocity.y + dt * force.y * this._massData.inverse_mass
        );

        this.torque = this._shape.torque(force);

        this.position = new Vector2(
            this.position.x + this.linearVelocity.x * dt,
            this.position.y + this.linearVelocity.y * dt
        );

        this.angularVelocity += this.torque / this._massData.inertia * dt;
        this.angle += this.angularVelocity * dt;

        this._force = Vector2.ZERO;
    }

    public updateBy(rigidBody: RigidBody): void {
        super.updateBy(rigidBody);
        this._massData.updateBy(rigidBody._massData);
        this.torque = rigidBody.torque;
        this.angularVelocity = rigidBody.angularVelocity;
        this.angle = rigidBody.angle;
    }

}