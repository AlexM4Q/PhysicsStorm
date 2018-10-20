import Particle from "./particle";
import {g} from "../../constants";
import Vector2 from "../data/vector2";
import Shape from "../geometry/shapes/shape";
import MassData from "./mass-data";
import Material from "./material/material";
import Transferable from "../base/transferable";

export default abstract class RigidBody extends Particle implements Transferable<RigidBody> {

    private static readonly FORCE_TOLERANCE: number = 0.025;

    private static readonly IMPULSE_TOLERANCE: number = 0.025;

    private readonly _isRotary: boolean;

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

    protected _isGrounded: boolean;

    public get isGrounded(): boolean {
        return this._isGrounded;
    }

    protected _angularVelocity: number;

    protected _torque: number;

    protected _angularMomentum: number;

    protected constructor(id: string, shape: Shape, material: Material, isStatic: boolean = false, isRotary: boolean = false) {
        super(id, shape, isStatic);

        this._isRotary = isRotary;
        this._force = Vector2.ZERO;
        this._impulse = Vector2.ZERO;
        this._material = material;
        this._isGrounded = false;
        this._torque = 0;
        this._angularVelocity = 0;
        this._angularMomentum = 0;

        if (isStatic) {
            this._massData = new MassData();
            return;
        }

        const mass = shape.square() * material.density;
        const inertia = shape.inertia(mass);
        this._massData = new MassData(mass, inertia);
    }

    public step(dt: number): void {
        if (this._isStatic) {
            return;
        }

        if (this._force.y > RigidBody.FORCE_TOLERANCE || this._impulse.y > RigidBody.IMPULSE_TOLERANCE) {
            this._isGrounded = false;
        }

        if (this._isGrounded) {
            this.linearVelocity = new Vector2(
                0.95 * this.linearVelocity.x + (this._impulse.x + dt * this._force.x) * this._massData.inverseMass
            );

            this.position = new Vector2(
                this.position.x + this.linearVelocity.x * dt,
                this.position.y
            );
        } else {
            this.linearVelocity = new Vector2(
                0.99 * this.linearVelocity.x + this._massData.inverseMass * (this._impulse.x + dt * this._force.x),
                0.99 * this.linearVelocity.y + this._massData.inverseMass * (this._impulse.y + dt * (this._force.y + this._massData.mass * g))
            );

            this.position = new Vector2(
                this.position.x + this.linearVelocity.x * dt,
                this.position.y + this.linearVelocity.y * dt
            );
        }

        if (this._isRotary && (this._torque || this._angularMomentum)) {
            this._angularVelocity += this._massData.inverseInertia * (this._angularMomentum + this._torque * dt);
            this._shape.rotate(this._angularVelocity * dt);
            this._torque = 0;
            this._angularMomentum = 0;
        }

        this._force = Vector2.ZERO;
        this._impulse = Vector2.ZERO;
        this._isGrounded = false;
    }

    public applyForce(force: Vector2): void {
        if (this._isStatic) {
            return;
        }

        if (force.x || force.y) {
            this._force = this._force.add(force);

            if (this._isRotary) {
                this._torque += this._shape.torque(force);
            }
        }
    }

    public applyImpulse(impulse: Vector2): void {
        if (this._isStatic) {
            return;
        }

        if (impulse.x || impulse.y) {
            this._impulse = this._impulse.add(impulse);

            if (this._isRotary) {
                this._angularMomentum += this._shape.angularMomentum(impulse);
            }
        }
    }

    public handleCollision(penetration: Vector2): void {
        if (penetration.y < 0) {
            this._isGrounded = true;
        }
    }

    public export(rigidBody: RigidBody): any {
        const result: any = super.export(rigidBody);
        result._isGrounded = this._isGrounded;
        return result;
    }

    public compare(rigidBody: RigidBody): boolean {
        return super.compare(rigidBody) && this._isGrounded === rigidBody._isGrounded;
    }

    public import(rigidBody: RigidBody): void {
        super.import(rigidBody);

        this._isGrounded = rigidBody._isGrounded;
    }

}