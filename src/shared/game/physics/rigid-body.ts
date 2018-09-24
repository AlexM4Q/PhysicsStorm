import Particle from "./particle";
import {g} from "../../constants";
import Vector2 from "../../data/vector2";
import Shape from "../geometry/shapes/shape";
import {injectable, unmanaged} from "inversify";
import Updatable from "../base/updatable";
import MassData from "./mass-data";
import Material from "./material/material";

@injectable()
export default abstract class RigidBody extends Particle implements Updatable<RigidBody> {

    private _force: Vector2;

    protected readonly _material: Material;

    public get material(): Material {
        return this._material;
    }

    protected readonly _massData: MassData;

    public get massData(): MassData {
        return this._massData;
    }

    protected _torque: number = 0;

    protected _angularVelocity: number = 0;

    protected _angle: number = 0;

    protected _grounded: boolean = false;

    public get grounded(): boolean {
        return this._grounded;
    }

    protected constructor(@unmanaged() shape: Shape, @unmanaged() material: Material, @unmanaged() isStatic: boolean = false) {
        super(shape, isStatic);

        this._material = material;

        if (isStatic) {
            this._massData = new MassData();
            return;
        }

        this._force = Vector2.ZERO;

        const mass = shape.square() * material.density;
        const inertia = shape.inertia(mass);
        this._massData = new MassData(mass, inertia);
    }

    public step(dt: number): void {
        if (this._isStatic) {
            return;
        }

        if (this.linearVelocity.y > 0 || this._force.y > 0) {
            this._grounded = false;
        }

        if (this.grounded) {
            this._force = new Vector2(this._force.x,);

            this.linearVelocity = new Vector2(
                this.linearVelocity.x + dt * this._force.x * this._massData.inverse_mass,
                0.001
            );
        } else {
            this._force = new Vector2(
                this._force.x,
                this._force.y + this._massData.mass * g
            );

            this.linearVelocity = new Vector2(
                this.linearVelocity.x + dt * this._force.x * this._massData.inverse_mass,
                this.linearVelocity.y + dt * this._force.y * this._massData.inverse_mass
            );
        }

        this.position = new Vector2(
            this.position.x + this.linearVelocity.x * dt,
            this.position.y + this.linearVelocity.y * dt
        );

        this._torque = this._shape.torque(this._force);
        this._angularVelocity += this._torque / this._massData.inertia * dt;
        this._angle += this._angularVelocity * dt;

        this._force = Vector2.ZERO;
    }

    public updateBy(rigidBody: RigidBody): void {
        super.updateBy(rigidBody);
        this._massData.updateBy(rigidBody._massData);
        this._torque = rigidBody._torque;
        this._angularVelocity = rigidBody._angularVelocity;
        this._angle = rigidBody._angle;
    }

    public applyForce(force: Vector2): void {
        if (this._isStatic) {
            return;
        }

        this._force = this._force.add(force);

        if (force.y > 0) {
            this._grounded = false;
        }
    }

    public applyImpulse(impulse: Vector2): void {
        if (this._isStatic) {
            return;
        }

        this.linearVelocity = new Vector2(
            this.linearVelocity.x + impulse.x * this._massData.inverse_mass,
            this.linearVelocity.y + impulse.y * this._massData.inverse_mass
        );

        if (impulse.y > 0) {
            this._grounded = false;
        }
    }

    public handleCollision(penetration: Vector2): void {
        if (penetration.y < 0) {
            this._grounded = true;
        }
    }

}