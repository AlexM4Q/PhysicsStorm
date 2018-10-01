import Vector2 from "../../../data/vector2";
import Shape from "./shape";
import Updatable from "../../base/updatable";
import Collidable from "./collidable";
import Circle from "./circle";
import CollisionDetector from "../collision-detector";
import {metersToPixels} from "../../../utils/common-utils";
import Polygon from "./polygon";

export default class Box extends Shape implements Collidable, Updatable<Box> {

    private readonly _halfSize: Vector2;

    public get halfSize(): Vector2 {
        return this._halfSize;
    }

    public constructor(position: Vector2, halfSize: Vector2) {
        super(position);

        this._halfSize = halfSize;
    }

    public collideBox(box: Box): Vector2 {
        return CollisionDetector.collideBoxBox(this, box);
    }

    public collideCircle(circle: Circle): Vector2 {
        return CollisionDetector.collideBoxCircle(this, circle);
    }

    public collidePolygon(polygon: Polygon): Vector2 {
        return CollisionDetector.collideShapeShape(this, polygon);
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillRect(
            metersToPixels(this.position.x - this._halfSize.x),
            metersToPixels(this.position.y - this._halfSize.y),
            metersToPixels(this._halfSize.x * 2),
            metersToPixels(this._halfSize.y * 2)
        );
    }

    public square(): number {
        return 4 * this._halfSize.x * this._halfSize.y;
    }

    public support(direction: Vector2): Vector2 {
        let x: number = this.position.x - this._halfSize.x;
        let y: number = this.position.y - this._halfSize.y;
        let furthestDistance: number = x * direction.x + y * direction.y;
        let furthestX: number = x;
        let furthestY: number = y;

        x = this.position.x - this._halfSize.x;
        y = this.position.y + this._halfSize.y;
        let distance: number = x * direction.x + y * direction.y;
        if (furthestDistance < distance) {
            furthestDistance = distance;
            furthestX = x;
            furthestY = y;
        }

        x = this.position.x + this._halfSize.x;
        y = this.position.y - this._halfSize.y;
        distance = x * direction.x + y * direction.y;
        if (furthestDistance < distance) {
            furthestDistance = distance;
            furthestX = x;
            furthestY = y;
        }

        x = this.position.x + this._halfSize.x;
        y = this.position.y + this._halfSize.y;
        distance = x * direction.x + y * direction.y;
        if (furthestDistance < distance) {
            furthestX = x;
            furthestY = y;
        }

        return new Vector2(furthestX, furthestY);
    }

    public torque(force: Vector2): number {
        return force.y * this._halfSize.x - force.x * this._halfSize.y;
    }

    public inertia(mass: number): number {
        return mass * (this._halfSize.x * this._halfSize.x + this._halfSize.y * this._halfSize.y) / 6
    }

}