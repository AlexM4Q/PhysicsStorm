import Vector2 from "../../../data/vector2";
import Updatable from "../../base/updatable";
import Collidable from "./collidable";
import Box from "./box";
import Circle from "./circle";
import Polygon from "./polygon";

export default abstract class Shape implements Collidable, Updatable<Shape> {

    public position: Vector2;

    public angle: number = 0;

    protected constructor(position: Vector2) {
        this.position = position;
    }

    public abstract collideBox(box: Box): Vector2;

    public abstract collideCircle(circle: Circle): Vector2;

    public abstract collidePolygon(circle: Polygon): Vector2;

    /**
     * Отрисовка фигуры
     */
    public abstract draw(canvasContext: CanvasRenderingContext2D): void;

    /**
     * Вращает Фигуру на заданный угол в радианах
     * @param {number} value Угол вращения в радианах
     */
    public rotate(value: number): void {
        this.angle += value;
    }

    /**
     * Площадь фигуры в м^2
     * @returns {number}
     */
    public abstract square(): number;

    /**
     * Опорная функция
     * @param {Vector2} direction Направление
     * @returns {number}
     */
    public abstract support(direction: Vector2): Vector2;

    /**
     * Момент силы
     * @param {Vector2} force Приложенная сила
     * @returns {number}
     */
    public abstract torque(force: Vector2): number;

    /**
     * Момент импульса
     * @param {Vector2} impulse Приложенный импульс
     * @returns {number}
     */
    public angularMomentum(impulse: Vector2): number {
        const support = this.support(impulse);
        const radius = this.position.subtract(support);
        const product = radius.crossProduct(impulse);
        return product;
    }

    /**
     * Момент инерции
     * @param {number} mass Масса
     * @returns {number}
     */
    public abstract inertia(mass: number): number;

    /**
     * Обновление фигуры по другой фигуре
     * @param {Shape} shape Другая фигура
     */
    public updateBy(shape: Shape): void {
        if (shape.position !== undefined) {
            this.position = Vector2.parse(shape.position);
        }

        if (shape.angle !== undefined) {
            this.angle = shape.angle;
        }
    }
}