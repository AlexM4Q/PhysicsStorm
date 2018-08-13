import Particle from "./particle";
import {g} from "../../../constants";
import Vector from "../../../data/vector";
import Shape from "../shapes/shape";
import {injectable, unmanaged} from "inversify";
import Updatable from "../base/updatable";
import Box from "../shapes/box";
import GeometryUtils from "../../../utils/geometry-utils";
import Circle from "../shapes/circle";
import MassData from "../base/mass-data";
import Material from "../material/material";

@injectable()
export default abstract class RigidBody extends Particle implements Updatable<RigidBody> {

    private _force: Vector;
    protected _material: Material;
    protected _massData: MassData;
    protected torque: number = 0;
    protected angularVelocity: number = 0;
    protected angle: number = 0;

    protected constructor(@unmanaged() shape: Shape, @unmanaged() material: Material) {
        super(shape);

        this._force = Vector.ZERO;
        this._material = material;

        const mass = shape.square() * material.density;
        const inertia = shape.inertia(mass);
        this._massData = new MassData(mass, inertia);
    }

    public addForce(force: Vector): void {
        this._force = this._force.add(force);
    }

    public step(dt: number): void {
        const force = new Vector(
            this._force.x,
            this._force.y + this._massData.mass * g
        );

        this.linearVelocity = new Vector(
            this.linearVelocity.x + dt * force.x * this._massData.inverse_mass,
            this.linearVelocity.y + dt * force.y * this._massData.inverse_mass
        );

        this.torque = this._shape.torque(force);

        this.position = new Vector(
            this.position.x + this.linearVelocity.x * dt,
            this.position.y + this.linearVelocity.y * dt
        );

        this.angularVelocity += this.torque / this._massData.inertia * dt;
        this.angle += this.angularVelocity * dt;

        this._force = Vector.ZERO;
    }

    public updateBy(rigidBody: RigidBody): void {
        super.updateBy(rigidBody);
        this._massData.updateBy(rigidBody._massData);
        this.torque = rigidBody.torque;
        this.angularVelocity = rigidBody.angularVelocity;
        this.angle = rigidBody.angle;
    }

}