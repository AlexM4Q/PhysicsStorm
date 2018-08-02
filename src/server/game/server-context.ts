import container from "../inversify.config";
import GameServer from "./game-server";
import Player from "../../shared/game/entities/player";
import {inject, injectable} from "inversify";
import World from "../../shared/game/world";

@injectable()
export default class ServerContext {

    public constructor(@inject(World) private readonly world: World) {
    }

    public startServer(): void {
        const server = new GameServer();

        this.world.start();

        setInterval(() => {
            server.sendAll({
                type: 'state',
                state: this.world.state
            });
        }, 10);

        server.onConnection = (id) => {
            const player = container.resolve(Player);
            player.id = id;
            this.world.addObject(player);
        };

        server.onMessage = (info) => {
            const data = info.data;
            const player = this.world.objects.filter(x => x.id === info.id && x instanceof player)[0];

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
                    player.shoot(data.target);
                    break;
            }
        };

        server.onClose = (id) => {
            this.world.remove(id);
        };
    }
}