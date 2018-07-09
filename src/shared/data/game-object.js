import Vector from "./vector";
import uuidv4 from "uuid/v4";

export default class GameObject {

    constructor() {
        this.id = uuidv4();
        this.size = new Vector(0, 0);
        this.position = new Vector(0, 0);
    }

}