import Shape from "./shape";
import Updatable from "../base/updatable";
import Vector from "../../data/vector";
import Box from "./box";
import GeometryUtils from "../../utils/geometry-utils";

export default class Circle extends Shape implements Updatable<Circle> {

    /**
     * Конструктор
     * @param {Vector} position Координата
     * @param {number} radius Радиус
     */
    public constructor(position: Vector, radius: number) {
        super(position);
        this._radius = radius;
    }

    /**
     * Радиус
     */
    private _radius: number;

    public get radius(): number {
        return this._radius;
    }

    public collideBox(box: Box): boolean {
        return GeometryUtils.collideBoxCircle(box, this);
    }

    public collideCircle(circle: Circle): boolean {
        return GeometryUtils.collideCircleCircle(this, circle);
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillRect(this.position.x, this.position.y, this._radius, this._radius);
    }

    public square(): number {
        return Math.PI * this._radius * this._radius;
    }

    public support(direction:Vector):Vector {
        const coefficient = this.radius / direction.length;

        return new Vector(
            this.position.x + direction.x * coefficient,
            this.position.y + direction.y * coefficient
        );
    }

    public torque(force: Vector): number {
        return force.y * this._radius + force.x * this._radius;
    }

    public inertia(mass: number): number {
        return mass * this._radius * this._radius / 2
    }

    public updateBy(circle: Circle): void {
        super.updateBy(circle);
        this._radius = circle._radius;
    }

}