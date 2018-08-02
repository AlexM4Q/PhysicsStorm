import GameObject from "../base/game-object";
import Vector from "../../../data/vector";
import Shape from "../shapes/shape";
import {injectable, unmanaged} from "inversify";

/**
 * Движимая частица с формой и цветом
 */
@injectable()
export default abstract class Particle<S extends Shape> extends GameObject {

    public linearVelocity: Vector;

    protected constructor(@unmanaged() protected readonly shape: S) {
        super();
    }

    public abstract move(dt): void;

}