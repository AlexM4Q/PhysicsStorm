import Vector from "../../../data/vector";
import Shape from "./shape";
import Updatable from "../base/updatable";

export default class Box extends Shape implements Updatable<Box> {

    private _size: Vector;

    constructor(size: Vector) {
        super();
        this._size = size;
    }

    public get size(): Vector {
        return this._size;
    }

    public torque(force: Vector): number {
        return (force.y * this._size.x - force.x * this._size.y) / 2;
    }

    public inertia(mass: number): number {
        return mass * (this._size.x * this._size.x + this._size.y * this._size.y) / 12
    }

    public updateBy(box: Box): void {
        this._size.updateBy(box._size);
    }

}