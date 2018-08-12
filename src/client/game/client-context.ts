import Renderer from "./renderer";
import {wsHost} from "../../shared/constants";
import {inject, injectable} from "inversify";
import {clientContainer} from "../inversify.config";
import {CLIENT_TYPES} from "../inversify.types";
import GameClient from "./game-client";
import World from "../../shared/game/world";
import GameObject from "../../shared/game/entities/base/game-object";
import Player from "../../shared/game/entities/player";
import Vector from "../../shared/data/vector";

@injectable()
export default class ClientContext {

    private readonly client: GameClient;
    private readonly renderer: Renderer;
    private readonly player: Player;

    public constructor(@inject(CLIENT_TYPES.World) private readonly world: World) {
        this.client = new GameClient(wsHost);
        this.renderer = new Renderer();
        this.player = clientContainer.resolve(Player);

        this.world.addObject(this.player);
    }

    public startGame(): void {
        const scene = document.getElementById("scene");

        this.world.start();
        this.renderer.start(scene);

        this.client.onRegister = (id) => {
            this.player.id = id;
        };

        this.client.onMessage = (message) => {
            switch (message.type) {
                case 'state':
                    this.world.update(message.state as GameObject[]);
                    this.renderer.renders = this.world.state;
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

    public click(inputNumber: number, target: Vector): void {
        this.client.click(inputNumber, target);
    }

}
