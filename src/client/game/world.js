import Player from "./objects/entities/player";
import Particle from "./objects/entities/particle";

const drawInterval = 1000 / 60;
const physicInterval = 10;

export default class World {

    constructor() {
        this._objects = [];
        this._lastUpdate = 0;

        const scene = document.getElementById("scene");
        const context = scene.getContext("2d");
        context.transform(1, 0, 0, -1, 0, scene.height);

        setInterval(() => {
            context.clearRect(0, 0, scene.width, scene.height);

            this._objects.forEach(object => object.draw(context))
        }, drawInterval);

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

    get players() {
        return this._objects.filter(o => o instanceof Player);
    }

    addObject(object) {
        this._objects.push(object);
    }

}