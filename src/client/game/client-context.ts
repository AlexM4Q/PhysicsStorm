import Renderer from "./renderer";
import {WS_HOST} from "../../shared/constants";
import {inject, injectable} from "inversify";
import {clientContainer} from "../inversify.config";
import {CLIENT_TYPES} from "../inversify.types";
import GameClient from "./game-client";
import World from "../../shared/game/world";
import Player from "../../shared/game/entities/player";
import Vector2 from "../../shared/data/vector2";
import Particle from "../../shared/game/physics/particle";
import Ball from "../../shared/game/entities/ball";
import WorldGenerator from "../../shared/game/world-generator";

@injectable()
export default class ClientContext {

    private readonly _client: GameClient;
    private readonly _player: Player;
    private _renderer: Renderer;

    public constructor(@inject(CLIENT_TYPES.World) private readonly _world: World) {

        this._client = new GameClient(WS_HOST);
        this._player = clientContainer.resolve(Player);

        this._world.addObject(this._player);
    }

    public startGame(): void {
        const scene: HTMLCanvasElement = document.getElementById("scene") as HTMLCanvasElement;

        this._renderer = new Renderer(scene);
        this._world.onWorldUpdate = () => this._renderer.draw(this._world.particles);
        this._world.start();

        this._client.onRegister = (id) => {
            this._player.id = id;
        };

        this._client.onMessage = (message) => {
            switch (message.type) {
                case 'state':
                    // this._world.update(message.state as Particle[]);
                    break;
            }
        };
    }

    public right(inputNumber: number): void {
        this._player.right();
        this._client.right(inputNumber);
    }

    public left(inputNumber: number): void {
        this._player.left();
        this._client.left(inputNumber);
    }

    public stop(inputNumber: number): void {
        this._player.stop();
        this._client.stop(inputNumber);
    }

    public jump(inputNumber: number): void {
        this._player.jump();
        this._client.jump(inputNumber);
    }

    public click(inputNumber: number, target: Vector2): void {
        this._world.addObject(WorldGenerator.createBall(target.x, target.y, Math.random() * 25 + 5));

        this._client.click(inputNumber, target);
    }

}
