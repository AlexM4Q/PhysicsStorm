import {Container} from "inversify";
import World from "../shared/game/world";

export const TYPES: any = {
    WORLD: Symbol.for(World.toString())
};

export const container = new Container();
container.bind<World>(TYPES.WORLD).toSelf().inSingletonScope();