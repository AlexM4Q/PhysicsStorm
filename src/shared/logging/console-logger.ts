import Logger from "./logger";

export default class ConsoleLogger implements Logger {

    constructor(private readonly clazz: any) {
    }

    public debug(message: any): void {
        console.log('\x1b[30m%s\x1b[0m', `debug ${this.clazz.name}: ${message}`);
    }

    public info(message: any): void {
        console.log('\x1b[32m%s\x1b[0m', `info  ${this.clazz.name}: ${message}`);
    }

    public warn(message: any): void {
        console.log('\x1b[35m%s\x1b[0m', `warn  ${this.clazz.name}: ${message}`);
    }

    public error(message: any): void {
        console.log('\x1b[31m%s\x1b[0m', `error ${this.clazz.name}: ${message}`);
    }

}