import Vector from "../../../data/vector";
import uuidv4 from "uuid/v4";
import {TYPE_GAME_OBJECT} from "../../game-object-types";

export default class GameObject {

    constructor() {
        this.id = uuidv4();
        this.type = TYPE_GAME_OBJECT;
        this.position = new Vector(0, 0);
        this.color = "#000000";
    }

    draw(context) {
    }

}