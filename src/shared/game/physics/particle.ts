import GameObject from "../base/game-object";
import Vector from "../../data/vector";
import Shape from "../shapes/shape";
import {injectable, unmanaged} from "inversify";
import Updatable from "../base/updatable";

/**
 * Движимая частица с формой и цветом без столкновений
 */
@injectable()
export default abstract class Particle extends GameObject implements Updatable<Particle> {

    public readonly isStatic;

    protected readonly _shape: Shape;

    public linearVelocity: Vector;

    protected constructor(@unmanaged() shape: Shape, @unmanaged() isStatic: boolean = false) {
        super();

        this._shape = shape;
        this.isStatic = isStatic;
    }

    public get shape(): Shape {
        return this._shape;
    }

    public get position(): Vector {
        return this._shape.position;
    }

    public set position(value: Vector) {
        this._shape.position = value;
    }

    public abstract step(dt: number): void;

    public updateBy(particle: Particle): void {
        super.updateBy(particle);
        this._shape.updateBy(particle._shape);
        this.linearVelocity = Vector.parse(particle.linearVelocity);
    }

}