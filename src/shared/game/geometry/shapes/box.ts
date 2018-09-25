import Vector2 from "../../../data/vector2";
import Shape from "./shape";
import Updatable from "../../base/updatable";
import Collidable from "./collidable";
import Circle from "./circle";
import CollisionDetector from "../collision-detector";

export default class Box extends Shape implements Collidable, Updatable<Box> {

    private _halfSize: Vector2;

    public constructor(position: Vector2, halfSize: Vector2) {
        super(position);
        this._halfSize = halfSize;
    }

    public get halfSize(): Vector2 {
        return this._halfSize;
    }

    public collideBox(box: Box): Vector2 {
        return CollisionDetector.collideBoxBox(this, box);
    }

    public collideCircle(circle: Circle): Vector2 {
        return CollisionDetector.collideBoxCircle(this, circle);
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillRect(this.position.x - this._halfSize.x, this.position.y - this._halfSize.y, 2 * this._halfSize.x, 2 * this._halfSize.y);
    }

    public square(): number {
        return 4 * this._halfSize.x * this._halfSize.y;
    }

    public support(direction: Vector2): Vector2 {
        let x: number = this.position.x - this._halfSize.x;
        let y: number = this.position.y - this._halfSize.y;
        let furthestDistance: number = x * direction.x + y * direction.y;
        let support: Vector2 = new Vector2(x, y);

        x = this.position.x - this._halfSize.x;
        y = this.position.y + this._halfSize.y;
        let distance: number = x * direction.x + y * direction.y;
        if (furthestDistance < distance) {
            furthestDistance = distance;
            support = new Vector2(x, y);
        }

        x = this.position.x + this._halfSize.x;
        y = this.position.y - this._halfSize.y;
        distance = x * direction.x + y * direction.y;
        if (furthestDistance < distance) {
            furthestDistance = distance;
            support = new Vector2(x, y);
        }

        x = this.position.x + this._halfSize.x;
        y = this.position.y + this._halfSize.y;
        distance = x * direction.x + y * direction.y;
        if (furthestDistance < distance) {
            support = new Vector2(x, y);
        }

        return support;
    }

    public torque(force: Vector2): number {
        return force.y * this._halfSize.x - force.x * this._halfSize.y;
    }

    public inertia(mass: number): number {
        return mass * (this._halfSize.x * this._halfSize.x + this._halfSize.y * this._halfSize.y) / 6
    }

    public updateBy(box: Box): void {
        super.updateBy(box);
        this._halfSize = Vector2.parse(box._halfSize);
    }

}