import Vector from "../../../data/vector";
import Shape from "./shape";
import Updatable from "../base/updatable";
import Collidable from "./collidable";
import Circle from "./circle";

export default class Box extends Shape implements Collidable, Updatable<Box> {

    private _size: Vector;

    public constructor(position: Vector, size: Vector) {
        super(position);
        this._size = size;
    }

    public get size(): Vector {
        return this._size;
    }

    public collideBox(box: Box): boolean {
        return false;
    }

    public collideCircle(circle: Circle): boolean {
        return undefined;
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillRect(this.position.x, this.position.y, this._size.x, this._size.y);
    }

    public square(): number {
        return this._size.x * this._size.y;
    }

    public torque(force: Vector): number {
        return (force.y * this._size.x - force.x * this._size.y) / 2;
    }

    public inertia(mass: number): number {
        return mass * (this._size.x * this._size.x + this._size.y * this._size.y) / 12
    }

    public updateBy(box: Box): void {
        super.updateBy(box);
        this._size = Vector.parse(box._size);
    }

}