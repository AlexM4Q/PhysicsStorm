import GameClient from "./game-client";
import Renderer from "./renderer";
import {wsHost} from "../../shared/constants";
import {inject, injectable} from "inversify";
import World from "../../shared/game/world";
import {TYPES} from "../../shared/inversify.config";

@injectable()
export default class ClientContext {

    private client: GameClient;
    private renderer: Renderer;

    public constructor(@inject(TYPES.WORLD) private  world: World) {
        this.renderer = new Renderer();
        this.client = new GameClient(wsHost);
    }

    public startGame(): void {
        const scene = document.getElementById("scene");

        this.world.start();
        this.renderer.start(scene);
        this.client.onMessage = (message) => {
            const data = JSON.parse(message.data);

            switch (data.type) {
                case 'state':
                    this.renderer.renders = data.state;
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
