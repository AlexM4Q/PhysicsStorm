import {worldHeight} from "../../shared/constants";
import {client} from "./client-context";
import Vector from "../../shared/data/vector";

export function onKeyDown(event) {
    switch (event.code) {
        case "KeyA":
            client.left();
            break;
        case "KeyD":
            client.right();
            break;
        case "Space":
            client.jump();
            break;
    }
}

export function onKeyUp(event) {
    switch (event.code) {
        case "KeyD":
        case "KeyA":
            client.stop();
            break;
    }
}

export function onClick(event) {
    if (event.path[0].id === 'scene') {
        client.click(new Vector(event.layerX, worldHeight - event.layerY));
    }
}