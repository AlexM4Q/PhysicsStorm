import GameClient from "./game-client";
import Renderer from "./renderer";
import {wsHost} from "../../shared/constants";
import {inject, injectable} from "inversify";
import World from "../../shared/game/world";
import GameObject from "../../shared/game/entities/base/game-object";
import container from "../../server/inversify.config";
import Player from "../../shared/game/entities/player";

@injectable()
export default class ClientContext {

    private client: GameClient;
    private renderer: Renderer;

    public constructor(@inject(World) private readonly world: World) {
        this.client = new GameClient(wsHost);
        this.renderer = new Renderer();
    }

    public startGame(): void {
        const scene = document.getElementById("scene");

        this.world.start();
        this.renderer.start(scene);

        const player = container.resolve(Player);
        player.id = id;
        this.world.addObject(player);

        this.client.onMessage = (message) => {
            switch (message.type) {
                case 'state':
                    this.world.update(message.state as GameObject[]);
                    this.renderer.renders = this.world.state;
                    break;
            }
        };
    }

    public right(): void {
        this.client.right();
    }

    public left(): void {
        this.client.left();
    }

    public stop(): void {
        this.client.stop();
    }

    public jump(): void {
        this.client.jump();
    }

    public click(target): void {
        this.client.click(target);
    }

}
