import Vector from "./data/vector.js";
import {g} from "./constants";

const drawInterval = 1000 / 60;
const physicInterval = 10;

const objects = [];
let lastUpdate = Date.now();

export function start() {
    const scene = document.getElementById("scene");
    const context = scene.getContext("2d");
    context.fillStyle = "#000000";
    context.transform(1, 0, 0, -1, 0, scene.height);

    objects.push({
        controllable: true,
        size: new Vector(5, 5),
        position: new Vector(75, 75),
        velocity: new Vector(),
        acceleration: new Vector()
    });

    setInterval(() => {
        context.clearRect(0, 0, scene.width, scene.height);

        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            const size = object.size;
            const position = object.position;

            context.fillRect(position.x, position.y, size.x, size.y);
        }
    }, drawInterval);

    setInterval(() => {
        const now = Date.now();
        const dt = now - lastUpdate;
        lastUpdate = now;

        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.velocity = object.velocity.add(object.acceleration.multiply(dt).addY(g));
            object.position = object.position.add(object.velocity.multiply(dt));
        }
    }, physicInterval);
}

window.onKeyDown = function (event) {
    switch (event.code) {
        case "KeyD":
            right();
            break;
        case "KeyA":
            left();
            break;
        case "Space":
            jump();
            break;
    }
};

window.onKeyUp = function (event) {
    switch (event.code) {
        case "KeyD":
        case "KeyA":
            stop();
            break;
    }
};

function stop() {
    controllables().forEach(o => o.velocity.x = 0);
}

function left() {
    controllables().forEach(o => o.velocity.x = -1);
}

function right() {
    controllables().forEach(o => o.velocity.x = 1);
}

function jump() {
    controllables().forEach(o => o.acceleration.y = 5);
}

function controllables() {
    return objects.filter(o => o.controllable);
}