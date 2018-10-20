import Comparable from "../base/comparable";

export default class Vector2 implements Comparable<Vector2> {

    public static readonly TOLERANCE: number = 0.1;

    public static readonly ZERO: Vector2 = new Vector2();

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    constructor(private readonly _x = 0, private readonly _y = 0) {
    }

    /**
     * Длина вектора
     * @returns {number}
     */
    public get length(): number {
        return Math.sqrt(this.lengthSquare);
    }

    /**
     * Длина вектора в квадрате
     * @returns {number}
     */
    public get lengthSquare(): number {
        return this._x * this._x + this._y * this._y;
    }

    /**
     * Нормализованный вектор
     * @returns {Vector2}
     */
    public get normalized(): Vector2 {
        const length = this.length;
        return new Vector2(this._x / length, this._y / length);
    }

    /**
     * Сложение векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public add(vector: Vector2): Vector2 {
        return new Vector2(this._x + vector._x, this._y + vector._y);
    }

    /**
     * Вычитание векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public subtract(vector: Vector2): Vector2 {
        return new Vector2(this._x - vector._x, this._y - vector._y);
    }

    /**
     * Умножение векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public multiply(vector: Vector2): Vector2 {
        return new Vector2(this._x * vector._x, this._y * vector._y);
    }

    /**
     * Деление векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public divide(vector: Vector2): Vector2 {
        return new Vector2(this._x / vector._x, this._y / vector._y);
    }

    /**
     * Умножение копонент вектора на множитель
     * @param factor Множитель
     * @returns {Vector2} Результат
     */
    public factor(factor: number): Vector2 {
        return new Vector2(this._x * factor, this._y * factor);
    }

    /**
     * Скалярное произведение
     * @param {Vector2} vector Другой вектор
     * @returns {number} Результат
     */
    public dotProduct(vector: Vector2): number {
        return this._x * vector._x + this._y * vector._y;
    }

    /**
     * Векторное произведение
     * @param {Vector2} vector Другой вектор
     * @returns {number} Результат
     */
    public crossProduct(vector: Vector2): number {
        return this._x * vector._y - this._y * vector._x;
    }

    /**
     * @param value
     */
    public cross(value: number): Vector2 {
        return new Vector2(-value * this._y, value * this._x);
    }

    /**
     * Расстояние до точки
     * @param {Vector2} vector Другой вектор
     * @returns {number} Результат
     */
    public distanceTo(vector: Vector2): number {
        const dx = this._x - vector._x;
        const dy = this._y - vector._y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Создает новый вектор с координатами преобразованными заданной функцией
     * @param f функция преобразования
     * @returns {number} Преобразованный вектор
     */
    public change(f: any): Vector2 {
        if (f && typeof f === "function") {
            return new Vector2(f(this._x), f(this._y));
        }
    }

    public equals(vector: Vector2): boolean {
        return this._x === vector._x && this._y === vector._y;
    }

    public compare(vector: Vector2, tolerance: number = Vector2.TOLERANCE): boolean {
        return Math.abs(this._x - vector._x) < tolerance && Math.abs(this._y - vector._y) < tolerance;
    }

    /**
     * Конвертирование произвольного объектв в вектор
     * @param target Произвольный объект
     * @returns {Vector2} Результат
     */
    public static parse(target: Vector2): Vector2 {
        return new Vector2(target._x, target._y);
    }

    /**
     * Проверяет равенство двух векторов
     * @param a Первый вектор
     * @param b Второй вектор
     */
    public static equals(a: Vector2, b: Vector2): boolean {
        return a && b && a.equals(b);
    }

}