import {worldHeight} from "../../shared/constants";
import {context} from "./client-context";
import Vector from "../../shared/data/vector";

export function onKeyDown(event) {
    switch (event.code) {
        case "KeyA":
            context.left();
            break;
        case "KeyD":
            context.right();
            break;
        case "Space":
            context.jump();
            break;
    }
}

export function onKeyUp(event) {
    switch (event.code) {
        case "KeyD":
        case "KeyA":
            context.stop();
            break;
    }
}

export function onClick(event) {
    if (event.path[0].id === 'scene') {
        context.click(new Vector(event.layerX, worldHeight - event.layerY));
    }
}