export default class Vector {

    public static readonly ZERO: Vector = new Vector(0, 0);

    constructor(private readonly _x = 0, private readonly _y = 0) {
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
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
     * @returns {Vector}
     */
    public get normalize(): Vector {
        const length = this.length;
        return new Vector(this._x / length, this._y / length);
    }

    /**
     * Сложение векторов
     * @param {Vector} vector Другой вектор
     * @returns {Vector} Результат
     */
    public add(vector: Vector): Vector {
        return new Vector(this._x + vector._x, this._y + vector._y);
    }

    /**
     * Вычитание векторов
     * @param {Vector} vector Другой вектор
     * @returns {Vector} Результат
     */
    public subtract(vector: Vector): Vector {
        return new Vector(this._x - vector._x, this._y - vector._y);
    }

    /**
     * Умножение векторов
     * @param {Vector} vector Другой вектор
     * @returns {Vector} Результат
     */
    public multiply(vector: Vector): Vector {
        return new Vector(this._x * vector._x, this._y * vector._y);
    }

    /**
     * Деление векторов
     * @param {Vector} vector Другой вектор
     * @returns {Vector} Результат
     */
    public divide(vector: Vector): Vector {
        return new Vector(this._x / vector._x, this._y / vector._y);
    }

    /**
     * Умножение копонент вектора на множитель
     * @param factor Множитель
     * @returns {Vector} Результат
     */
    public factor(factor: number): Vector {
        return new Vector(this._x * factor, this._y * factor);
    }

    /**
     * Скалярное произведение
     * @param {Vector} vector Другой вектор
     * @returns {number} Результат
     */
    public dotProduct(vector: Vector): number {
        return this._x * vector._x + this._y * vector._y;
    }

    /**
     * Конвертирование произвольного объектв в вектор
     * @param target Произвольный объект
     * @returns {Vector} Результат
     */
    public static parse(target: Vector): Vector {
        return new Vector(target._x, target._y);
    }
}