import "reflect-metadata";
import {Container} from "inversify";
import TYPES from "./inversify.types";
import World from "../shared/game/world";

const container = new Container();
container.bind(TYPES.World).to(World).inSingletonScope();

export default container;