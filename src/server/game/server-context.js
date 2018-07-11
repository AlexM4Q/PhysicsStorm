import GameServer from "./game-server";
import Player from "../../shared/game/objects/entities/player";
import Vector from "../../shared/data/vector";
import {world} from "../../shared/game/shared-context";

export function startServer() {
    const server = new GameServer();

    world.start();

    setInterval(() => {
        server.sendAll({
            type: 'state',
            state: world.state
        });
    }, 10);

    server.onConnection = (id) => {
        const player = new Player();
        player.id = id;
        world.addObject(player);
    };

    server.onMessage = (info) => {
        const data = info.data;
        const player = world.players.filter(x => x.id === info.id)[0];

        switch (data.type) {
            case 'move':
                switch (data.direction) {
                    case 'right':
                        player.velocity.x = player.maxVelocity.x;
                        break;
                    case 'left':
                        player.velocity.x = -player.maxVelocity.x;
                        break;
                    case 'stop':
                        player.velocity.x = 0;
                        break;
                    case 'jump':
                        player.velocity.y = 2;
                        break;
                }
                break;
            case 'click':
                player.shoot(Vector.cast(data.target));
                break;
        }
    };

    server.onClose = (id) => {
        world.remove(id);
    };
}