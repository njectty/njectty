import { Module } from "./module";

export class Exports {
    tokens = new Set<any>();

    constructor(private module: Module) {}

    has(token: any): boolean {
        return this.tokens.has(token);
    }

    get(token: any): any {
        return this.module.get(token);
    }
}
