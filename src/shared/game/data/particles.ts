import Particle from "../physics/particle";

export default class Particles {

    private readonly _map: { [id: string]: Particle };

    public get map(): { [id: string]: Particle } {
        return this._map;
    }

    public constructor(map: { [p: string]: Particle } = {}) {
        this._map = map;
    }

    public setObject(gameObject: Particle): void {
        this._map[gameObject.id] = gameObject;
    }

    public getObject(id: string): Particle {
        return this._map[id];
    }

    public removeObject(id: string): void {
        delete this._map[id];
    }

}