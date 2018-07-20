import Vector from "../../../data/vector";
import uuidv4 from "uuid/v4";
import {TYPE_GAME_OBJECT, TYPE_PLAYER} from "../../game-object-types";
import Player from "./player";

export default class GameObject {

    constructor() {
        this.id = uuidv4();
        this.type = TYPE_GAME_OBJECT;
        this.position = new Vector(0, 0);
        this.color = "#000000";
    }

    static cast(obj) {
        let cast;
        switch (obj.type) {
            case TYPE_GAME_OBJECT:
                cast = new GameObject();
                break;
            case TYPE_PLAYER:
                cast = new Player();
                break;
            default:
                return undefined;
        }

        cast.updateBy(obj);
        return cast;
    }

    draw(context) {
    }

    updateBy(obj) {
        Object.assign(this, obj);
    }

}