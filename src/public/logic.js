import World from "./world";
import Player from "./objects/entities/player";

let world;

export function start() {
    world = new World();

    world.addObject(new Player());

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
}

function right() {
    world.controllables.forEach(o => o.velocity.x = o.maxVelocity.x);
}

function left() {
    world.controllables.forEach(o => o.velocity.x = -o.maxVelocity.x);
}

function stop() {
    world.controllables.forEach(o => o.velocity.x = 0);
}

function jump() {
    world.controllables.forEach(o => o.velocity.y = 2);
}