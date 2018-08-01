import Vector from "../../../data/vector";

export default abstract class Shape {

    public abstract torque(force: Vector): number;

    public abstract inertia(mass: number): number;

}