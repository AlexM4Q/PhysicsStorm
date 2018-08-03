import Renderer from "./renderer";
import {wsHost} from "../../shared/constants";
import {inject, injectable} from "inversify";
import {clientContainer} from "../inversify.config";
import {CLIENT_TYPES} from "../inversify.types";
import GameClient from "./game-client";
import World from "../../shared/game/world";
import GameObject from "../../shared/game/entities/base/game-object";
import Player from "../../shared/game/entities/player";
import Logger from "../../shared/logging/logger";
import ConsoleLogger from "../../shared/logging/console-logger";

@injectable()
export default class ClientContext {

    private readonly client: GameClient;
    private readonly renderer: Renderer;

    private player: Player;

    public constructor(@inject(CLIENT_TYPES.World) private readonly world: World) {
        this.client = new GameClient(wsHost);
        this.renderer = new Renderer();
    }

    public startGame(): void {
        const scene = document.getElementById("scene");

        this.world.start();
        this.renderer.start(scene);

        this.player = clientContainer.resolve(Player);
        this.world.addObject(this.player);

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
