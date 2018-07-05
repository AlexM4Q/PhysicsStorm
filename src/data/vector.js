export default class Vector {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
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

    multiply(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }

}