import Vector from "./vector";
import uuidv4 from "uuid/v4";

export default class GameObject {

    constructor(obj) {
        if(obj){
            Object.assign(this, obj);
        } else {
            this.id = uuidv4();
            this.size = new Vector(0, 0);
            this.position = new Vector(0, 0);
        }
    }

    updateBy(obj) {
        Object.assign(this, obj);
    }

}