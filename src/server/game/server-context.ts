import {serverContainer} from "../inversify.config";
import SERVER_TYPES from "../inversify.types";
import GameServer from "./game-server";
import Player from "../../shared/game/entities/player";
import {inject, injectable} from "inversify";
import World from "../../shared/game/world";
import Vector from "../../shared/data/vector";
import {Application} from "express";

@injectable()
export default class ServerContext {

    public constructor(@inject(SERVER_TYPES.World) private readonly world: World) {
    }

    public startServer(app: Application): void {
        const server = new GameServer(app);

        this.world.start();

        setInterval(() => {
            server.sendAll({
                type: 'state',
                state: this.world.state
            });
        }, 100);

        server.onConnection = (id) => {
            const player = serverContainer.resolve(Player);
            player.id = id;
            this.world.addObject(player);
        };

        server.onMessage = (info) => {
            const data: any = info.data;
            const player: Player = this.world.objects.filter(x => x.id === info.id && x instanceof Player)[0] as Player;

            switch (data.type) {
                case 'move':
                    switch (data.direction) {
                        case 'right':
                            player.linearVelocity.x = player.maxVelocity.x;
                            break;
                        case 'left':
                            player.linearVelocity.x = -player.maxVelocity.x;
                            break;
                        case 'stop':
                            player.linearVelocity.x = 0;
                            break;
                        case 'jump':
                            player.linearVelocity.y = 2;
                            break;
                    }
                    break;
                case 'click':
                    player.shoot(Vector.parse(data.target));
                    break;
            }
        };

        server.onClose = (id) => {
            this.world.remove(id);
        };
    }
}