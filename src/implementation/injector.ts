import { not } from "logical-not";

import {
    injectableParamsKey,
    injectorModuleKey,
    moduleConfigKey,
    moduleKey,
} from "./core/constants";
import { Module } from "./core/module";
import { Module as ModuleDecorator } from "./module";

export class Injector {
    private [injectorModuleKey]: Module;

    create(injectable: any, params?: { injects: any[] }): any {
        if (not(injectable)) return;
        if (not(injectableParamsKey in injectable)) return;

        const module = this[injectorModuleKey];

        if (Array.isArray(params?.injects)) {
            class SourceClass {}

            ModuleDecorator(SourceClass);

            const tempModule = Module.create({
                SourceClass,
                context: module.context,
                globalInjector: module.globalInjector,
                parentModule: module,
                injects: [injectable].concat(params!.injects),
            });

            const instance = tempModule.get(injectable);

            tempModule.dispose();

            return instance;
        }

        return module.context.create(module, injectable);
    }

    mount(module: any, params?: { injects: any[] }): any {
        if (not(module) || not(moduleConfigKey in module)) return null;

        const parentModule = this[injectorModuleKey];

        return Module.create({
            SourceClass: module,
            context: parentModule.context,
            globalInjector: parentModule.globalInjector,
            parentModule,
            injects: params?.injects || [],
        }).instance;
    }

    unmount(module: any): any {
        if (module[moduleKey]) (module[moduleKey] as Module).dispose();
    }
}
