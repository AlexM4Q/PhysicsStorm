import Particle from "./particle";
import {g} from "../../../constants";
import Vector from "../../../data/vector";
import Bullet from "./bullet";
import {world} from "../../shared-context";

export default class Player extends Particle {
    constructor() {
        super();
        this.size = new Vector(5, 5);
        this.position = new Vector(0, 0);
    }

    move(dt) {
        super.move(dt);
        const acceleration = this.acceleration.addY(g);
        this.velocity = this.velocity.add(acceleration.factor(dt));
        this.position = this.position.add(this.velocity.factor(dt));
    }

    shoot(target) {
        world.addObject(new Bullet(this.position, target));
    }
}