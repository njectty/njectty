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
            class ModuleClass {}

            ModuleDecorator(ModuleClass);

            const tempModule = Module.create({
                ModuleClass,
                context: module.context,
                globalInjector: module.globalInjector,
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
            ModuleClass: module,
            context: parentModule.context,
            globalInjector: parentModule.globalInjector,
            injects: params?.injects || [],
        }).instance;
    }

    unmount(module: any): any {
        if (module[moduleKey]) (module[moduleKey] as Module).dispose();
    }
}
