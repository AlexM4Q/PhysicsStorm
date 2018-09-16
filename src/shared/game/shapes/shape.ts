import Vector2 from "../../data/vector2";
import Updatable from "../base/updatable";
import Collidable from "./collidable";
import Box from "./box";
import Circle from "./circle";

export default abstract class Shape implements Collidable, Updatable<Shape> {

    public position: Vector2;

    protected constructor(position: Vector2) {
        this.position = position;
    }

    public resolveCollision(penetration: Vector2): void {
        this.position = this.position.subtract(penetration);
    }

    public abstract collideBox(box: Box): Vector2;

    public abstract collideCircle(circle: Circle): Vector2;

    /**
     * Отрисовка фигуры
     */
    public abstract draw(canvasContext: CanvasRenderingContext2D): void;

    /**
     * Площадь фигуры
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
     * Вращательный момент
     * @param {Vector2} force Приложенная сила
     * @returns {number}
     */
    public abstract torque(force: Vector2): number;

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
        this.position = Vector2.parse(shape.position);
    }
}