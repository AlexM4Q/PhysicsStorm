import {g} from "./constants";

const drawInterval = 1000 / 60;
const physicInterval = 10;

export default class World {

    constructor() {
        this._objects = [];
        this._lastUpdate = 0;

        const scene = document.getElementById("scene");
        const context = scene.getContext("2d");
        context.fillStyle = "#000000";
        context.transform(1, 0, 0, -1, 0, scene.height);

        setInterval(() => {
            context.clearRect(0, 0, scene.width, scene.height);

            for (let i = 0; i < this._objects.length; i++) {
                const object = this._objects[i];
                const size = object.size;
                const position = object.position;

                context.fillRect(position.x, position.y, size.x, size.y);
            }
        }, drawInterval);

        setInterval(() => {
            const now = Date.now();
            const dt = now - this._lastUpdate;
            this._lastUpdate = now;

            for (let i = 0; i < this._objects.length; i++) {
                const object = this._objects[i];

                object.velocity = object.velocity.add(object.acceleration.multiply(dt).addY(g));
                object.position = object.position.add(object.velocity.multiply(dt));

                if (object.position.y < 0) object.position.y = 0;
            }
        }, physicInterval);
    }

    get controllables() {
        return this._objects.filter(o => o.controllable);
    }

    addObject(object) {
        this._objects.push(object);
    }

}