import Shape from "./shape";
import Importable from "../../base/importable";
import Vector2 from "../../data/vector2";
import Box from "./box";
import CollisionDetector from "../collision-detector";
import {metersToPixels} from "../../../utils/common-utils";
import Polygon from "./polygon";
import Exportable from "../../base/exportable";
import Viewport from "../../data/viewport";

export default class Circle extends Shape implements Importable<Circle>, Exportable<Circle> {

    protected _radius: number;

    public get radius(): number {
        return this._radius;
    }

    /**
     * Конструктор
     * @param {Vector2} position Координата
     * @param {number} radius Радиус
     */
    public constructor(position: Vector2, radius: number) {
        super(position);

        this._radius = radius;
    }

    public collideBox(box: Box): Vector2 {
        const penetration: Vector2 = CollisionDetector.collideBoxCircle(box, this);
        return penetration ? penetration.factor(-1) : undefined;
    }

    public collideCircle(circle: Circle): Vector2 {
        return CollisionDetector.collideCircleCircle(this, circle);
    }

    public collidePolygon(polygon: Polygon): Vector2 {
        return CollisionDetector.collideShapeShape(this, polygon);
    }

    public draw(canvasContext: CanvasRenderingContext2D, viewport: Viewport): void {
        canvasContext.beginPath();
        canvasContext.arc(
            viewport.center.x + metersToPixels(this.position.x),
            viewport.center.y + metersToPixels(this.position.y),
            metersToPixels(this._radius),
            0, 2 * Math.PI
        );
        canvasContext.fill();
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
        return mass * this._radius * this._radius / 2;
    }

    public export(circle: Circle): any {
        const result: any = super.export(circle);
        result._radius = this._radius;
        return result;
    }

    public compare(circle: Circle): boolean {
        return super.compare(circle) && this._radius === circle._radius;
    }

}