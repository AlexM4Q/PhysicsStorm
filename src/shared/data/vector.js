export default class Vector {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalize() {
        return new Vector(this.x, this.y).factor(1 / this.length);
    }

    static cast(obj) {
        if (obj) {
            const vector = new Vector();
            Object.assign(vector, obj);
            return vector;
        }

        return undefined;
    }

    addX(value) {
        return new Vector(this.x + value, this.y);
    }

    addY(value) {
        return new Vector(this.x, this.y + value);
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(vector) {
        return new Vector(this.x * vector.x, this.y * vector.y);
    }

    divide(vector) {
        return new Vector(this.x / vector.x, this.y / vector.y);
    }

    factor(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }

}