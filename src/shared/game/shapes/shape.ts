import Vector from "../../data/vector";
import Updatable from "../base/updatable";
import Collidable from "./collidable";
import Box from "./box";
import Circle from "./circle";

export default abstract class Shape implements Collidable, Updatable<Shape> {

    public position: Vector;

    protected constructor(position: Vector) {
        this.position = position;
    }

    public abstract collideBox(box: Box): boolean;

    public abstract collideCircle(circle: Circle): boolean;

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
     * @param {Vector} direction Направление
     * @returns {number}
     */
    public abstract support(direction: Vector): Vector;

    /**
     * Вращательный момент
     * @param {Vector} force Приложенная сила
     * @returns {number}
     */
    public abstract torque(force: Vector): number;

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
        this.position = Vector.parse(shape.position);
    }

}