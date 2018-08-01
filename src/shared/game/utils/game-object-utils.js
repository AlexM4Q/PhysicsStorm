import {TYPE_GAME_OBJECT, TYPE_PLAYER} from "../game-object-types";
import Player from "../objects/entities/player";
import GameObject from "../objects/entities/game-object";

export function cast(obj) {
    let cast;
    switch (obj.type) {
        case TYPE_GAME_OBJECT:
            cast = new GameObject();
            break;
        case TYPE_PLAYER:
            cast = new Player();
            break;
        default:
            return undefined;
    }

    Object.assign(cast, obj);
    return cast;
}