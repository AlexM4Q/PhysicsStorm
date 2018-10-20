import Particles from "../../shared/game/data/particles";

// todo Реализовать оптимиальное обновление состояния
export default class StateExporter {

    private static oldState: { [id: string]: any } = {};

    public static export(particles: Particles): any[] {
        const newState: { [id: string]: any } = {};
        for (const id in particles.map) {
            if (!particles.map.hasOwnProperty(id)) {
                continue;
            }

            newState[id] = particles.getObject(id).export(StateExporter.oldState[id]);
        }

        return Object.values(StateExporter.oldState = newState);
    }

}