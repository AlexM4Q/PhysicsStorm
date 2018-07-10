import Player from "./objects/entities/player";
import Particle from "./objects/entities/particle";

const physicInterval = 10;

export default class World {

    constructor() {
        this._objects = [];
        this._lastUpdate = 0;
    }

    start() {
        setInterval(() => {
            const now = Date.now();
            const dt = now - this._lastUpdate;
            this._lastUpdate = now;

            for (let i = 0; i < this._objects.length; i++) {
                const object = this._objects[i];

                if (object instanceof Particle) {
                    object.move(dt);
                }

                if (object.position.y < 0) object.position.y = 0;
            }
        }, physicInterval);
    }

    get state() {
        return this._objects;
    }

    get players() {
        return this._objects.filter(o => o instanceof Player);
    }

    addObject(object) {
        this._objects.push(object);
    }

}