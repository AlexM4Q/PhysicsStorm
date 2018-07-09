import World from "./world";
import Player from "./objects/entities/player";
import GameServer from "./game-server";

let server;
let world;

export function startServer() {
    server = new GameServer();
    window.world = world = new World();

    world.addObject(new Player());

    setInterval(() => {
        server.sendAll({
            type: 'state',
            renders: world.renders
        });
    }, 10);
}