import {serverContainer} from "../inversify.config";
import SERVER_TYPES from "../inversify.types";
import GameServer from "./game-server";
import Player from "../../shared/game/entities/player";
import {decorate, inject, injectable} from "inversify";
import World from "../../shared/game/world";
import Vector2 from "../../shared/data/vector2";
import {Application} from "express";
import WorldGenerator from "../../shared/game/world-generator";
import container from "../../shared/inversify.config";
import TYPES from "../../shared/inversify.types";
import Particle from "../../shared/game/physics/particle";
import {
    WS_KEY_DATA,
    WS_KEY_ID,
    WS_KEY_INPUT,
    WS_KEY_INPUT_CLICK,
    WS_KEY_INPUT_JUMP,
    WS_KEY_INPUT_LEFT,
    WS_KEY_INPUT_RIGHT,
    WS_KEY_INPUT_STOP,
    WS_KEY_TYPE,
    WS_KEY_TYPE_STATE
} from "../../shared/constants-ws";
import {STATE_INTERVAL} from "../constants";

export default class ServerContext {

    public constructor(private readonly _world: World) {
    }

    public startServer(app: Application): void {
        const server: GameServer = new GameServer(app);

        this._world.start();

        setInterval(() => {
            server.sendAll({
                [WS_KEY_TYPE]: WS_KEY_TYPE_STATE,
                [WS_KEY_DATA]: this._world.gameObjects
            });
        }, STATE_INTERVAL);

        server.onConnection = (id: string) => {
            const player: Player = serverContainer.resolve(Player);
            player.id = id;
            this._world.addObject(player);
        };

        server.onMessage = (message: any) => {
            const id: string = message[WS_KEY_ID];
            const player: Player = this._world.gameObjects.filter(x => x.id === id && x instanceof Player)[0] as Player;

            switch (message[WS_KEY_INPUT]) {
                case WS_KEY_INPUT_RIGHT:
                    player.right();
                    break;
                case WS_KEY_INPUT_LEFT:
                    player.left();
                    break;
                case WS_KEY_INPUT_STOP:
                    player.stop();
                    break;
                case WS_KEY_INPUT_JUMP:
                    player.jump();
                    break;
                case WS_KEY_INPUT_CLICK:
                    const target: Vector2 = Vector2.parse(message[WS_KEY_DATA]);

                    const object: Particle = Math.random() < 0.5
                        ? WorldGenerator.createCube(target.x, target.y, Math.random() * 25 + 5, Math.random() * 25 + 5)
                        : WorldGenerator.createBall(target.x, target.y, Math.random() * 25 + 5);

                    container.get<World>(TYPES.World).addObject(object);
                    break;
            }
        };

        server.onClose = (id: string) => {
            this._world.remove(id);
        };
    }
}

decorate(injectable(), ServerContext);
decorate(inject(SERVER_TYPES.World) as any, ServerContext, 0);
