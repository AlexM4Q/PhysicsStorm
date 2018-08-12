import GameObject from "../base/game-object";
import Vector from "../../../data/vector";
import Shape from "../shapes/shape";
import {injectable, unmanaged} from "inversify";
import Updatable from "../base/updatable";

/**
 * Движимая частица с формой и цветом
 */
@injectable()
export default abstract class Particle extends GameObject implements Updatable<Particle> {

    protected readonly _shape: Shape;

    public linearVelocity: Vector;

    protected constructor(@unmanaged() shape: Shape) {
        super();

        this._shape = shape;
    }

    public abstract step(dt: number): void;

    public updateBy(particle: Particle): void {
        super.updateBy(particle);
        this._shape.updateBy(particle._shape);
        this.linearVelocity = Vector.parse(particle.linearVelocity);
    }

}