export default abstract class Logger {

    protected readonly _name: string;

    protected constructor(_clazz: any) {
        this._name = _clazz.name;
    }

    abstract debug(message: any): void;

    abstract info(message: any): void;

    abstract warn(message: any): void;

    abstract error(message: any): void;

}