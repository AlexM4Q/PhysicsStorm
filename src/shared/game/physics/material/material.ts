export default class Material {

    /**
     * Плотность
     */
    protected readonly _density: number;

    get density(): number {
        return this._density;
    }

    /**
     * Прыгучесть
     */
    protected readonly _restitution: number;

    get restitution(): number {
        return this._restitution;
    }

    /**
     * Статическое трение
     */
    protected readonly _staticFriction: number;

    get staticFriction(): number {
        return this._staticFriction;
    }

    /**
     * Динамическое трение
     */
    protected readonly _dynamicFriction: number;

    get dynamicFriction(): number {
        return this._dynamicFriction;
    }

    /**
     * Конструктор
     * @param {number} density Плотность
     * @param {number} restitution Прыгучесть
     * @param {number} staticFriction Статическое трение
     * @param {number} dynamicFriction Динамическое трение
     */
    constructor(density: number, restitution: number, staticFriction: number, dynamicFriction: number) {
        this._density = density;
        this._restitution = restitution;
        this._staticFriction = staticFriction;
        this._dynamicFriction = dynamicFriction;
    }
}