import GameObject from "../base/game-object";
import Vector from "../../../data/vector";
import Shape from "../shapes/shape";
import {injectable, unmanaged} from "inversify";
import Updatable from "../base/updatable";

/**
 * Движимая частица с формой и цветом
 */
@injectable()
export default abstract class Particle<S extends Shape> extends GameObject implements Updatable<Particle<S>> {

    public linearVelocity: Vector;

    protected constructor(@unmanaged() protected readonly shape: S) {
        super();
    }

    public abstract move(dt): void;

    public updateBy(particle: Particle<S>): void {
        super.updateBy(particle);
        this.linearVelocity.updateBy(particle.linearVelocity);
        this.shape.updateBy(particle.shape);
    }

}