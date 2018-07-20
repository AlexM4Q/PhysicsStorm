import Player from "./objects/entities/player";
import Particle from "./objects/entities/physics/particle";
import {physicInterval} from "../constants";

export default class World {

    constructor() {
        this._objects = [];
        this._lastUpdate = 0;
    }

    get state() {
        return this._objects;
    }

    get players() {
        return this._objects.filter(o => o instanceof Player);
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

    addObject(object) {
        this._objects.push(object);
    }

    remove(id) {
        this._objects = this._objects.filter(x => x.id !== id);
    }
}