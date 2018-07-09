import {worldHeight} from "../../server/game/constants";
import {client} from "./context";

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
        client.click(event.layerX, worldHeight - event.layerY);
    }
}