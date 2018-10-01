import "reflect-metadata";
import {Container} from "inversify";
import TYPES from "./inversify.types";
import World from "../shared/game/world";
import Player from "./game/entities/player";
import Block from "./game/entities/block";
import Ball from "./game/entities/ball";
import Cube from "./game/entities/cube";
import Stone from "./game/entities/stone";
import Bullet from "./game/entities/bullet";

const container = new Container();
container.bind(TYPES.World).to(World).inSingletonScope();
container.bind(TYPES.Player).to(Player).inTransientScope();
container.bind(TYPES.Block).to(Block).inTransientScope();
container.bind(TYPES.Ball).to(Ball).inTransientScope();
container.bind(TYPES.Cube).to(Cube).inTransientScope();
container.bind(TYPES.Stone).to(Stone).inTransientScope();
container.bind(TYPES.Bullet).to(Bullet).inTransientScope();

export default container;