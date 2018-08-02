import "reflect-metadata";
import Particle from "./entities/physics/particle";
import {physicInterval} from "../constants";
import {injectable} from "inversify";
import GameObject from "./entities/base/game-object";

@injectable()
export default class World {

    private _objects: GameObject[] = [];
    private _lastUpdate: number;

    public get state() {
        return this._objects;
    }

    public start(): void {
        setInterval(() => {
            const now = Date.now();
            const dt = now - this._lastUpdate;
            this._lastUpdate = now;

            for (let i = 0; i < this._objects.length; i++) {
                const object: GameObject = this._objects[i];

                if (object instanceof Particle) {
                    object.move(dt);
                }

                if (object.position.y < 0) object.position.y = 0;
            }
        }, physicInterval);
    }

    public get objects(): GameObject[] {
        return this._objects;
    }

    public addObject(object): void {
        this._objects.push(object);
    }

    public remove(id): void {
        this._objects = this._objects.filter(x => x.id !== id);
    }
}