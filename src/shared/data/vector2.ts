export default class Vector2 {

    public static readonly ZERO: Vector2 = new Vector2(0, 0);

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public set x(x : number) {
        this._x = x;
    }

    public set y(y : number) {
        this._y = y;
    }

    constructor(private  _x = 0, private  _y = 0) {
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
     * Конвертирование произвольного объектв в вектор
     * @param target Произвольный объект
     * @returns {Vector2} Результат
     */
    public static parse(target: Vector2): Vector2 {
        return new Vector2(target._x, target._y);
    }
}