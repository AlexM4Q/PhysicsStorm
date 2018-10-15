import Vector2 from "../../data/vector2";
import Shape from "./shape";
import Importable from "../../base/importable";
import Collidable from "./collidable";
import Circle from "./circle";
import CollisionDetector from "../collision-detector";
import {metersToPixels} from "../../../utils/common-utils";
import Box from "./box";
import Exportable from "../../base/exportable";
import Viewport from "../../data/viewport";

export default class Polygon extends Shape implements Collidable, Importable<Polygon>, Exportable<Polygon> {

    private readonly _vertices: Vector2[];

    public get vertices(): Vector2[] {
        return this._vertices;
    }

    public constructor(position: Vector2, vertices: Vector2[]) {
        super(position);

        this._vertices = vertices;
    }

    public collideBox(box: Box): Vector2 {
        return CollisionDetector.collideShapeShape(this, box);
    }

    public collideCircle(circle: Circle): Vector2 {
        return CollisionDetector.collideShapeShape(this, circle);
    }

    public collidePolygon(polygon: Polygon): Vector2 {
        return CollisionDetector.collideShapeShape(this, polygon);
    }

    public draw(canvasContext: CanvasRenderingContext2D, viewport: Viewport): void {
        canvasContext.beginPath();
        canvasContext.moveTo(
            viewport.center.x + metersToPixels(this.position.x + this._vertices[0].x),
            viewport.center.y + metersToPixels(this.position.y + this._vertices[0].y)
        );

        for (let i: number = 1; i < this._vertices.length; i++) {
            canvasContext.lineTo(
                viewport.center.x + metersToPixels(this.position.x + this._vertices[i].x),
                viewport.center.y + metersToPixels(this.position.y + this._vertices[i].y)
            );
        }

        canvasContext.closePath();
        canvasContext.fill();
    }

    public rotate(value: number): void {
        super.rotate(value);

        const count: number = this._vertices.length;

        const cos: number = Math.cos(value);
        const sin: number = Math.sin(value);
        for (let i: number = 0; i < count; i++) {
            this._vertices[i] = new Vector2(
                this._vertices[i].x * cos - this._vertices[i].y * sin,
                this._vertices[i].y * cos + this._vertices[i].x * sin
            );
        }
    }

    public square(): number {
        let total: number = 0;

        for (let i: number = 0; i < this._vertices.length; i++) {
            total += i === this._vertices.length - 1
                ? (this._vertices[i].x * this._vertices[0].y - this._vertices[0].x * this._vertices[i].y) * 0.5
                : (this._vertices[i].x * this._vertices[i + 1].y - this._vertices[i + 1].x * this._vertices[i].y) * 0.5;
        }

        return Math.abs(total);
    }

    public support(direction: Vector2): Vector2 {
        let furthestDistance: number = -Number.MAX_VALUE;
        let furthestX: number;
        let furthestY: number;

        for (const vertex of this._vertices) {
            const x: number = this.position.x + vertex.x;
            const y: number = this.position.y + vertex.y;
            const distance: number = x * direction.x + y * direction.y;

            if (furthestDistance < distance) {
                furthestDistance = distance;
                furthestX = x;
                furthestY = y;
            }
        }

        return new Vector2(furthestX, furthestY);
    }

    public torque(force: Vector2): number {
        return 0;
    }

    public inertia(mass: number): number {
        return 0.01;
        // return mass * (this._halfSize.x * this._halfSize.x + this._halfSize.y * this._halfSize.y) / 6
    }

    public export(polygon: Polygon): any {
        const result: any = super.export(polygon);
        result._vertices = this._vertices;
        return result;
    }

}