import Vector from "../../../data/vector";
import Updatable from "../base/updatable";

export default abstract class Shape implements Updatable<Shape> {

    /**
     * Отрисовка фигуры
     */
    public abstract draw(canvasContext: CanvasRenderingContext2D, position: Vector): void;

    /**
     * Площадь фигуры
     * @returns {number}
     */
    public abstract square(): number;

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
    public abstract updateBy(shape: Shape): void;

}