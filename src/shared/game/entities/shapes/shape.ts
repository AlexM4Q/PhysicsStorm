import Vector from "../../../data/vector";
import Updatable from "../base/updatable";

export default abstract class Shape implements Updatable<Shape> {

    public abstract torque(force: Vector): number;

    public abstract inertia(mass: number): number;

    public abstract updateBy(shape: Shape): void;

}