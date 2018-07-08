import Vector from "../../data/vector";

export default class GameObject {

    constructor() {
        this.color = "#000000";
        this.size = new Vector(0, 0);
        this.position = new Vector(0, 0);
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

}