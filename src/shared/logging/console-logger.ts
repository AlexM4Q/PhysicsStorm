import Logger from "./logger";

export default class ConsoleLogger extends Logger {

    public constructor(clazz: any) {
        super(clazz);
    }

    public debug(message: any): void {
        console.log("\x1b[30m%s\x1b[0m", `debug ${this._name}: ${message}`);
    }

    public info(message: any): void {
        console.log("\x1b[32m%s\x1b[0m", `info  ${this._name}: ${message}`);
    }

    public warn(message: any): void {
        console.log("\x1b[35m%s\x1b[0m", `warn  ${this._name}: ${message}`);
    }

    public error(message: any): void {
        console.log("\x1b[31m%s\x1b[0m", `error ${this._name}: ${message}`);
    }

}