import "reflect-metadata";
import {Container} from "inversify";
import World from "../shared/game/world";

const container = new Container();
container.bind<World>(World).toSelf().inSingletonScope();

export default container;