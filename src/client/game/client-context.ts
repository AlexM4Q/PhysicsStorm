import Renderer from "./renderer";
import {wsHost} from "../../shared/constants";
import {inject, injectable} from "inversify";
import {clientContainer} from "../inversify.config";
import {CLIENT_TYPES} from "../inversify.types";
import GameClient from "./game-client";
import World from "../../shared/game/world";
import Player from "../../shared/game/entities/player";
import Vector2 from "../../shared/data/vector2";
import Particle from "../../shared/game/physics/particle";

@injectable()
export default class ClientContext {

    private readonly client: GameClient;
    private renderer: Renderer;
    private player: Player;

    public constructor(@inject(CLIENT_TYPES.World) private readonly world: World) {

        this.client = new GameClient(wsHost);
        this.player = clientContainer.resolve(Player);

        this.world.addObject(this.player);
    }

    public startGame(): void {
        this.renderer = new Renderer(document.getElementById("scene") as HTMLCanvasElement);
        this.world.onPhysicsUpdate = () => this.renderer.draw(this.world.particles);
        this.world.start();

        this.client.onRegister = (id) => {
            this.player.id = id;
        };

        this.client.onMessage = (message) => {
            switch (message.type) {
                case 'state':
                    // this.world.update(message.state as Particle[]);
                    // this.renderer.draw(this.world.particles);
                    break;
            }
        };
    }

    public right(inputNumber: number): void {
        this.player.right();
        this.client.right(inputNumber);
    }

    public left(inputNumber: number): void {
        this.player.left();
        this.client.left(inputNumber);
    }

    public stop(inputNumber: number): void {
        this.player.stop();
        this.client.stop(inputNumber);
    }

    public jump(inputNumber: number): void {
        this.player.jump();
        this.client.jump(inputNumber);
    }

    public click(inputNumber: number, target: Vector2): void {
        this.client.click(inputNumber, target);
    }

}
