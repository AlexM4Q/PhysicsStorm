import GameObject from "../base/game-object";
import Vector from "../../../data/vector";
import Shape from "../shapes/shape";

/**
 * Движимая частица с формой и цветом
 */
export default abstract class Particle<S extends Shape> extends GameObject {

    protected shape: S;
    protected linearVelocity: Vector;

    public abstract move(dt): void;

}