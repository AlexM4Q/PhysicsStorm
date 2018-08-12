export default class Material {

    /**
     * Плотность
     */
    protected readonly _density: number;

    /**
     * Прыгучесть
     */
    protected readonly _restitution: number;

    /**
     * Конструктор
     * @param {number} density Плотность
     * @param {number} restitution Прыгучесть
     */
    constructor(density: number, restitution: number) {
        this._density = density;
        this._restitution = restitution;
    }

    get density(): number {
        return this._density;
    }

    get restitution(): number {
        return this._restitution;
    }

}