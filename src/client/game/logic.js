import World from "./world";
import Player from "./objects/entities/player";
import Vector from "./data/vector";
import {worldHeight} from "./constants";

let world;

export function start() {
    window.world = world = new World();

    world.addObject(new Player());
}

export function onKeyDown(event) {
    switch (event.code) {
        case "KeyD":
            world.players.forEach(o => o.velocity.x = o.maxVelocity.x);
            break;
        case "KeyA":
            world.players.forEach(o => o.velocity.x = -o.maxVelocity.x);
            break;
        case "Space":
            world.players.forEach(o => o.velocity.y = 2);
            break;
    }
}

export function onKeyUp(event) {
    switch (event.code) {
        case "KeyD":
        case "KeyA":
            world.players.forEach(o => o.velocity.x = 0);
            break;
    }
}

const socket = new WebSocket("ws://localhost:8081");
socket.onmessage = function(event) {
    const incomingMessage = event.data;
    console.log(incomingMessage);
};

export function onClick(event) {
    socket.send('letletlet');


    if (event.path[0].id === 'scene') {
        const target = new Vector(event.layerX, worldHeight - event.layerY);

        world.players.forEach(o => o.shoot(target));
    }
}

