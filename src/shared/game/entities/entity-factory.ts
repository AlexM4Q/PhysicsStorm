import Guid from "../../utils/guid-utils";
import Particle from "../physics/particle";
import TYPES from "../../inversify.types";
import Player from "./player";
import Block from "./block";
import Ball from "./ball";
import Cube from "./cube";
import Stone from "./stone";
import Logger from "../../logging/logger";
import ConsoleLogger from "../../logging/console-logger";

export default class EntityFactory {

    private static readonly log: Logger = new ConsoleLogger(EntityFactory);

    public static newGuidTyped(type: string): string {
        return Guid.newGuid("xxxxxxxx-tttt-4xxx-yxxx-xxxxxxxxxxxx").replace("tttt", type);
    }

    public static getType(guid: string): string {
        return guid.substr(9, 4);
    }

    public static createFrom(object: Particle): Particle {
        switch (EntityFactory.getType(object.id)) {
            case TYPES.Player:
                return new Player();
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