import GameObject from "../base/game-object";
import Vector2 from "../data/vector2";
import Shape from "../geometry/shapes/shape";
import Viewport from "../data/viewport";
import Transferable from "../base/transferable";

/**
 * Движимая частица с формой и цветом без столкновений
 */
export default abstract class Particle extends GameObject implements Transferable<Particle> {

    protected readonly _shape: Shape;

    public get shape(): Shape {
        return this._shape;
    }

    public get position(): Vector2 {
        return this._shape.position;
    }

    public set position(value: Vector2) {
        this._shape.position = value;
    }

    protected readonly _isStatic: boolean;

    public get isStatic(): boolean {
        return this._isStatic;
    }

    public linearVelocity: Vector2 = Vector2.ZERO;

    protected constructor(id: string, shape: Shape, isStatic: boolean = false) {
        super(id);

        this._shape = shape;
        this._isStatic = isStatic;
    }

    public draw(canvasContext: CanvasRenderingContext2D, viewport: Viewport): void {
        canvasContext.fillStyle = this.color;
        this._shape.draw(canvasContext, viewport);
    }

    public abstract step(dt: number): void;

    public export(particle: Particle): any {
        const result: any = super.export(particle);
        result._shape = this._shape.export(particle && particle._shape);
        return result;
    }

    public compare(particle: Particle): boolean {
        return super.compare(particle) && this._shape.compare(particle._shape);
    }

    public import(particle: Particle): void {
        super.import(particle);

        this._shape.import(particle._shape);
    }

}