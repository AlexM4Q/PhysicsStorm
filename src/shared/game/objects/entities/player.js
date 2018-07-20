import Vector from "../../../data/vector";
import Bullet from "./bullet";
import {world} from "../../shared-context";
import Box from "./physics/box";
import {TYPE_PLAYER} from "../../game-object-types";

export default class Player extends Box {

    constructor() {
        super();
        this.type = TYPE_PLAYER;
        this.maxVelocity = new Vector(0.5, 0.5);
    }

    shoot(target) {
        world.addObject(new Bullet(this.position, target));
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

}