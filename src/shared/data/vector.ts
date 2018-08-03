import Updatable from "../game/entities/base/updatable";

export default class Vector implements Updatable<Vector> {

    public x: number;

    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public updateBy(vector: Vector): void {
        this.x = vector.x;
        this.y = vector.y;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public get normalize(): Vector {
        return new Vector(this.x, this.y).factor(1 / this.length);
    }

    public addX(value): Vector {
        return new Vector(this.x + value, this.y);
    }

    public addY(value): Vector {
        return new Vector(this.x, this.y + value);
    }

    public add(vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    public subtract(vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    public multiply(vector): Vector {
        return new Vector(this.x * vector.x, this.y * vector.y);
    }

    public divide(vector): Vector {
        return new Vector(this.x / vector.x, this.y / vector.y);
    }

    public factor(factor): Vector {
        return new Vector(this.x * factor, this.y * factor);
    }

    public static parse(target: any): Vector {
        return new Vector(target.x, target.y);
    }
}