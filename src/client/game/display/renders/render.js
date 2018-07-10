import GameObject from "../../../../shared/data/game-object";

export default class Render extends GameObject {

    constructor(obj) {
        super(obj);

        if (obj) {
            this.update(obj);
        } else {
            this.color = "#000000";
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    updateBy(obj) {
        super.updateBy(obj);

        Object.assign(this, obj);
    }

}