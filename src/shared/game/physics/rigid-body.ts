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

    private _impulse: Vector2;

    protected readonly _material: Material;

    public get material(): Material {
        return this._material;
    }

    protected readonly _massData: MassData;

    public get massData(): MassData {
        return this._massData;
    }

    protected _grounded: boolean;

    public get grounded(): boolean {
        return this._grounded;
    }

    protected _torque: number;

    protected _angularMomentum: number;

    protected _angularVelocity: number;

    protected _rotary: boolean;

    protected constructor(@unmanaged() shape: Shape, @unmanaged() material: Material, @unmanaged() isStatic: boolean = false) {
        super(shape, isStatic);

        this._material = material;

        if (isStatic) {
            this._massData = new MassData();
            return;
        }

        this._force = Vector2.ZERO;
        this._impulse = Vector2.ZERO;

        const mass = shape.square() * material.density;
        const inertia = shape.inertia(mass);
        this._massData = new MassData(mass, inertia);

        this._grounded = false;
        this._torque = 0;
        this._angularMomentum = 0;
        this._angularVelocity = 0;
        this._rotary = false;
    }

    public step(dt: number): void {
        if (this._isStatic) {
            return;
        }

        if (this.linearVelocity.y > 0 || this._force.y > 0) {
            this._grounded = false;
        }

        if (this._grounded) {
            this.linearVelocity = new Vector2(
                this.linearVelocity.x + (dt * this._force.x + this._impulse.x) * this._massData.inverse_mass
            );

            this.position = new Vector2(
                this.position.x + this.linearVelocity.x * dt,
                this.position.y
            );
        } else {
            this.linearVelocity = new Vector2(
                this.linearVelocity.x + this._massData.inverse_mass * (this._impulse.x + dt * this._force.x),
                this.linearVelocity.y + this._massData.inverse_mass * (this._impulse.y + dt * (this._force.y + this._massData.mass * g))
            );

            this.position = new Vector2(
                this.position.x + this.linearVelocity.x * dt,
                this.position.y + this.linearVelocity.y * dt
            );
        }

        if (this._rotary) {
            this._angularVelocity += this._massData.inverse_inertia * (this._angularMomentum + this._torque * dt);
            this._shape.rotate(this._angularVelocity * dt);
            this._torque = 0;
            this._angularMomentum = 0;
        }

        this._force = Vector2.ZERO;
        this._impulse = Vector2.ZERO;
        this._grounded = false;
    }

    public applyForce(force: Vector2): void {
        if (this._isStatic) {
            return;
        }

        this._force = this._force.add(force);

        if (this._rotary) {
            this._torque += this._shape.torque(force);
        }
    }

    public applyImpulse(impulse: Vector2): void {
        if (this._isStatic) {
            return;
        }

        this._impulse = this._impulse.add(impulse);

        if (this._rotary) {
            this._angularMomentum += this._shape.angularMomentum(impulse);
        }
    }

    public handleCollision(penetration: Vector2): void {
        if (penetration.y < 0) {
            this._grounded = true;
        }
    }

    public updateBy(rigidBody: RigidBody): void {
        super.updateBy(rigidBody);

        this._massData.updateBy(rigidBody._massData);
        this._torque = rigidBody._torque;
        this._angularMomentum = rigidBody._angularMomentum;
        this._angularVelocity = rigidBody._angularVelocity;
    }

}