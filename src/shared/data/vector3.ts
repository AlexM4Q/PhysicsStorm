export default class Vector3 {

    public static readonly ZERO: Vector3 = new Vector3(0, 0, 0);

    constructor(private readonly _x = 0, private readonly _y = 0, private readonly _z = 0) {
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z;
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
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * Нормализованный вектор
     * @returns {Vector2}
     */
    public get normalize(): Vector3 {
        const length = this.length;
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }

    /**
     * Сложение векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public add(vector: Vector3): Vector3 {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    /**
     * Вычитание векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public subtract(vector: Vector3): Vector3 {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    /**
     * Умножение векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public multiply(vector: Vector3): Vector3 {
        return new Vector3(this.x * vector.x, this.y * vector.y, this.z * vector.z);
    }

    /**
     * Деление векторов
     * @param {Vector2} vector Другой вектор
     * @returns {Vector2} Результат
     */
    public divide(vector: Vector3): Vector3 {
        return new Vector3(this.x / vector.x, this.y / vector.y, this.z / vector.z);
    }

    /**
     * Умножение копонент вектора на множитель
     * @param factor Множитель
     * @returns {Vector2} Результат
     */
    public factor(factor: number): Vector3 {
        return new Vector3(this.x * factor, this.y * factor, this.z * factor);
    }

    /**
     * Скалярное произведение
     * @param {Vector2} vector Другой вектор
     * @returns {number} Результат
     */
    public dotProduct(vector: Vector3): number {
        return this.x * vector.x + this.y * vector.z + this.z * vector.z;
    }

    /**
     * Векторное произведение
     * @param {Vector2} vector Другой вектор
     * @returns {number} Результат
     */
    public crossProduct(vector: Vector3): Vector3 {
        return new Vector3(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

    /**
     * Конвертирование произвольного объектв в вектор
     * @param target Произвольный объект
     * @returns {Vector3} Результат
     */
    public static parse(target: Vector3): Vector3 {
        return new Vector3(target.x, target.y, target.z);
    }
}