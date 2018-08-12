import Shape from "./shape";
import Updatable from "../base/updatable";
import Vector from "../../../data/vector";

export default class Circle extends Shape implements Updatable<Circle> {

    /**
     * Радиус
     */
    private _radius: number;

    /**
     * Конструктор
     * @param {number} radius Радиус
     */
    public constructor(radius: number) {
        super();

        this._radius = radius;
    }

    public get radius(): number {
        return this._radius;
    }

    public draw(canvasContext: CanvasRenderingContext2D, position: Vector): void {
        canvasContext.fillRect(position.x, position.y, this._radius, this._radius);
    }

    public square(): number {
        return Math.PI * this._radius * this._radius;
    }

    public torque(force: Vector): number {
        return force.y * this._radius + force.x * this._radius;
    }

    public inertia(mass: number): number {
        return mass * this._radius * this._radius / 2
    }

    public updateBy(box: Circle): void {
        this._radius = box._radius;
    }

}