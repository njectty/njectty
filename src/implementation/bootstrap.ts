import { not } from "logical-not";

import { moduleConfigKey } from "./core/constants";
import { Context } from "./core/context";
import { GlobalInjector } from "./core/global";
import { Module } from "./core/module";

export function bootstrap(module: any, params?: any): void {
    if (not(module) || not(moduleConfigKey in module)) return;

    const context = new Context();

    Module.create({
        SourceClass: module,
        context,
        globalInjector: new GlobalInjector(context),
        injects: getInjects(params),
    });
}

function getInjects(pamars?: { injects: any[] }): any[] {
    if (not(pamars) || not(Array.isArray(pamars?.injects))) return [];

    return pamars.injects;
}
