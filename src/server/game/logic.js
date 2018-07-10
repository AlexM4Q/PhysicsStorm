import World from "./world";
import Player from "./objects/entities/player";
import GameServer from "./game-server";

let server;
let world;

export function startServer() {
    server = new GameServer();
    world = new World();

    setInterval(() => {
        server.sendAll({
            type: 'state',
            renders: world.renders
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
                break;
        }

    };
}