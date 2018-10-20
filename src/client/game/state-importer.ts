import Particles from "../../shared/game/data/particles";
import Particle from "../../shared/game/physics/particle";
import EntityFactory from "../../shared/game/entity-factory";
import TimeState from "./data/time-state";

// todo Реализовать интерполяцию состояний
export default class StateImporter {

    private static readonly states: TimeState[] = [];

    public static import(particles: Particles, state: any[], timestamp: number): void {
        const oldParticles: Particles = StateImporter.findState(timestamp);
        if (!oldParticles) {
            return;
        }

        for (const object of state) {
            const oldParticle: Particle = oldParticles.getObject(object._id);
            if (oldParticle) {
                if (oldParticle.compare(object)) {
                    continue;
                }

                particles.getObject(object._id).import(object);
            } else {
                const particle: Particle = EntityFactory.createFrom(object as Particle);
                particle.import(object);
                particles.setObject(particle);
            }
        }
    }

    public static addState(particles: Particles): void {
        this.states.push(new TimeState(Date.now(), this.cloneState(particles)));
    }

    private static findState(timestamp: number): Particles {
        for (let i: number = 0; i < this.states.length; i++) {
            const timeState: TimeState = this.states[i];
            if (timeState.timestamp >= timestamp) {
                this.states.splice(0, i);
                return timeState.particles;
            }
        }
    }

    private static cloneState(particles: Particles): Particles {
        const stateClone: Particles = new Particles();
        for (const particleId in particles.map) {
            const particle: Particle = particles.getObject(particleId);
            if (particle) {
                const particleClone: Particle = EntityFactory.createFrom(particle);
                particleClone.import(particle);
                stateClone.setObject(particleClone);
            }
        }

        return stateClone;
    }

}