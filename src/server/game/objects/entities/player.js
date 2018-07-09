import Particle from "./particle";
import Bullet from "./bullet";
import {g} from "../../constants";
import Vector from "../../../../shared/data/vector";

export default class Player extends Particle {

    constructor() {
        super();
        this.size = new Vector(5, 5);
        this.position = new Vector(0, 0);
    }

    move(dt) {
        super.move(dt);
        this.velocity = this.velocity.add(this.acceleration.factor(dt).addY(g));
        this.position = this.position.add(this.velocity.factor(dt));
    }

    shoot(target) {
        window.world.addObject(new Bullet(this.position, target));
    }

}