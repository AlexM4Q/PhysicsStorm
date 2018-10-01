import {serverContainer} from "../inversify.config";
import SERVER_TYPES from "../inversify.types";
import GameServer from "./game-server";
import Player from "../../shared/game/entities/player";
import {inject, injectable} from "inversify";
import World from "../../shared/game/world";
import Vector2 from "../../shared/data/vector2";
import {Application} from "express";
import WorldGenerator from "../../shared/game/world-generator";
import container from "../../shared/inversify.config";
import TYPES from "../../shared/inversify.types";
import Particle from "../../shared/game/physics/particle";

@injectable()
export default class ServerContext {

    public constructor(@inject(SERVER_TYPES.World) private readonly _world: World) {
    }

    public startServer(app: Application): void {
        const server = new GameServer(app);

        this._world.start();

        setInterval(() => {
            server.sendAll({
                type: 'state',
                state: this._world.gameObjects
            });
        }, 100);

        server.onConnection = (id) => {
            const player = serverContainer.resolve(Player);
            player.id = id;
            this._world.addObject(player);
        };

        server.onMessage = (info) => {
            const data: any = info.data;
            const player: Player = this._world.gameObjects.filter(x => x.id === info.id && x instanceof Player)[0] as Player;

            switch (data.type) {
                case 'step':
                    switch (data.direction) {
                        case 'right':
                            player.right();
                            break;
                        case 'left':
                            player.left();
                            break;
                        case 'stop':
                            player.stop();
                            break;
                        case 'jump':
                            player.jump();
                            break;
                    }
                    break;
                case 'click':
                    const target: Vector2 = Vector2.parse(data.target);

                    const object: Particle = Math.random() < 0.5
                        ? WorldGenerator.createCube(target.x, target.y, Math.random() * 25 + 5, Math.random() * 25 + 5)
                        : WorldGenerator.createBall(target.x, target.y, Math.random() * 25 + 5);

                    container.get<World>(TYPES.World).addObject(object);
                    break;
            }
        };

        server.onClose = (id) => {
            this._world.remove(id);
        };
    }
}