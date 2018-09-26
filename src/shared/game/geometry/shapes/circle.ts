import Shape from "./shape";
import Updatable from "../../base/updatable";
import Vector2 from "../../../data/vector2";
import Box from "./box";
import CollisionDetector from "../collision-detector";
import {metersToPixels} from "../../../utils/common-utils";

export default class Circle extends Shape implements Updatable<Circle> {

    /**
     * Конструктор
     * @param {Vector2} position Координата
     * @param {number} radius Радиус
     */
    public constructor(position: Vector2, radius: number) {
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

    public collideBox(box: Box): Vector2 {
        return CollisionDetector.collideBoxCircle(box, this);
    }

    public collideCircle(circle: Circle): Vector2 {
        return CollisionDetector.collideCircleCircle(this, circle);
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.beginPath();
        canvasContext.arc(
            metersToPixels(this.position.x),
            metersToPixels(this.position.y),
            metersToPixels(this._radius),
            0, 2 * Math.PI
        );
        canvasContext.stroke();
    }

    public square(): number {
        return Math.PI * this._radius * this._radius;
    }

    public support(direction: Vector2): Vector2 {
        const coefficient = this.radius / direction.length;

        return new Vector2(
            this.position.x + direction.x * coefficient,
            this.position.y + direction.y * coefficient
        );
    }

    public torque(force: Vector2): number {
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