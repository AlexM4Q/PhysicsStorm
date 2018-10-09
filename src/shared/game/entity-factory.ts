import Guid from "../utils/guid-utils";
import Particle from "./physics/particle";
import TYPES from "../inversify.types";
import Player from "./entities/player";
import Block from "./entities/block";
import Ball from "./entities/ball";
import Cube from "./entities/cube";
import Stone from "./entities/stone";
import Logger from "../logging/logger";
import {getLogger} from "../logging/loggers";

export default class EntityFactory {

    private static readonly log: Logger = getLogger(EntityFactory);

    public static newGuidTyped(type: string): string {
        return Guid.newGuid("xxxxxxxx-tttt-4xxx-yxxx-xxxxxxxxxxxx").replace("tttt", type);
    }

    public static getType(guid: string): string {
        return guid.substring(9, 13);
    }

    public static createFrom(object: any): Particle {
        switch (EntityFactory.getType(object._id)) {
            case TYPES.Player:
                return Player.createFrom(object as Player);
            case TYPES.Block:
                return Block.createFrom(object as Block);
            case TYPES.Ball:
                return Ball.createFrom(object as Ball);
            case TYPES.Cube:
                return Cube.createFrom(object as Cube);
            case TYPES.Stone:
                return Stone.createFrom(object as Stone);
            default:
                EntityFactory.log.error(`Cannot create from ${object.id}`);
        }
    }

}