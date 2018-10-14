import Logger from "../logging/logger";
import Particles from "./data/particles";
import Particle from "./physics/particle";
import EntityFactory from "./entity-factory";
import {getLogger} from "../logging/loggers";

// todo Реализовать интерполяцию состояний
// todo Реализовать оптимиальное обновление состояния
export default class EntityOperator {

    private static readonly log: Logger = getLogger(EntityOperator);

    private static lastState: { [id: string]: any } = {};

    public static updateState(particles: Particles, state: any[]): void {
        for (const object of state) {
            let particle: Particle = particles.getObject(object._id);
            if (!particle) {
                particles.setObject(particle = EntityFactory.createFrom(object as Particle));
            }

            particle.import(object);
        }
    }

    public static getState(particles: Particles): any[] {
        const newState: { [id: string]: any } = {};
        for (const id in particles.map) {
            if (!particles.map.hasOwnProperty(id)) {
                continue;
            }

            newState[id] = particles.getObject(id).export(EntityOperator.lastState[id]);
        }

        return Object.values(EntityOperator.lastState = newState);
    }

}