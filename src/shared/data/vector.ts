export default class Vector {

    private _x: number;

    private _y: number;

    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    public get normalize(): Vector {
        return new Vector(this._x, this._y).factor(1 / this.length);
    }

    public addX(value): Vector {
        return new Vector(this._x + value, this._y);
    }

    public addY(value): Vector {
        return new Vector(this._x, this._y + value);
    }

    public add(vector): Vector {
        return new Vector(this._x + vector.x, this._y + vector.y);
    }

    public subtract(vector): Vector {
        return new Vector(this._x - vector.x, this._y - vector.y);
    }

    public multiply(vector): Vector {
        return new Vector(this._x * vector.x, this._y * vector.y);
    }

    public divide(vector): Vector {
        return new Vector(this._x / vector.x, this._y / vector.y);
    }

    public factor(factor): Vector {
        return new Vector(this._x * factor, this._y * factor);
    }

}