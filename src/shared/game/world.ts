import "reflect-metadata";
import Particle from "./physics/particle";
import {PHYSICS_INTERVAL} from "../constants";
import {injectable} from "inversify";
import GameObject from "./base/game-object";
import Vector2 from "../data/vector2";
import RigidBody from "./physics/rigid-body";
import WorldGenerator from "./world-generator";
import CollisionResolver from "./geometry/collision-resolver";
import Manifold from "./geometry/manifold";
import CollisionDetector from "./geometry/collision-detector";
import EntityFactory from "./entities/entity-factory";

@injectable()
export default class World {

    private _gameObjects: Particle[] = [];

    public get gameObjects(): GameObject[] {
        return this._gameObjects;
    }

    private _onWorldUpdate: any;

    public set onWorldUpdate(onPhysicsUpdate: any) {
        this._onWorldUpdate = onPhysicsUpdate;
    }

    public start(): void {
        new WorldGenerator(this).generate();

        let lastUpdate: number = Date.now();
        setInterval(() => {
            const now = Date.now();
            const dt = now - lastUpdate;
            lastUpdate = now;

            this.updatePhysics(dt / 1000);
        }, PHYSICS_INTERVAL);
    }

    public update(state: Particle[]): void {
        stateCycle:
            for (const object of state) {
                for (const gameObject of this._gameObjects) {
                    if (object.id === gameObject.id) {
                        gameObject.updateBy(object);
                        continue stateCycle;
                    }
                }

                const newObject = EntityFactory.createFrom(object);
                newObject.id = object.id;
                newObject.updateBy(object);
                this.addObject(newObject);
            }

        if (this._onWorldUpdate) {
            this._onWorldUpdate();
        }
    }

    public addObject(object: Particle): void {
        this._gameObjects.push(object);
    }

    public remove(id: string): void {
        this._gameObjects = this._gameObjects.filter(x => x.id !== id);
    }

    public updatePhysics(dt: number): void {
        const particles = this._gameObjects;
        // const gameObjects = this._gameObjects.sort((a, b) => b.position.y - a.position.y);
        // const gameObjects = this._gameObjects.sort((a, b) => a.position.y - b.position.y);
        const manifolds: Manifold[] = [];

        for (const particle of particles) {
            if (particle.isStatic || !(particle instanceof RigidBody)) {
                continue;
            }

            particle.step(dt);

            if (particle.position.y < 0) {
                particle.position = new Vector2(particle.position.x, 0);
                particle.linearVelocity = new Vector2(particle.linearVelocity.x, 0);
            }

            for (const collide of particles) {
                if (particle.id === collide.id || !(collide instanceof RigidBody)) {
                    continue;
                }

                const penetration = CollisionDetector.collide(particle.shape, collide.shape);
                if (penetration && (penetration.x || penetration.y)) {
                    manifolds.push(new Manifold(particle, collide, penetration));
                }
            }
        }

        filter:
            for (let i: number = 0; i < manifolds.length; i++) {
                const manifold: Manifold = manifolds[i];
                for (let j: number = i + 1; j < manifolds.length; j++) {
                    const duplicate: Manifold = manifolds[j];
                    if (manifold.a.id === duplicate.b.id && manifold.b.id === duplicate.a.id) {
                        continue filter;
                    }
                }

                CollisionResolver.resolveState(manifold);
                CollisionResolver.resolveImpulse(manifold);
            }

        if (this._onWorldUpdate) {
            this._onWorldUpdate();
        }
    }
}