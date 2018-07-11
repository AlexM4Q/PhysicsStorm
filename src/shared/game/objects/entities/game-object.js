import Vector from "../../../data/vector";
import uuidv4 from "uuid/v4";

export default class GameObject {
    constructor(obj) {
        this.id = uuidv4();
        this.size = new Vector(0, 0);
        this.position = new Vector(0, 0);
        this.color = "#000000";
    }

    static cast(obj) {
        if (obj) {
            const gameObject = new GameObject();
            gameObject.updateBy(obj);
            return gameObject;
        }

        return undefined;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    updateBy(obj) {
        Object.assign(this, obj);
    }
}