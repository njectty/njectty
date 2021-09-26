import { not } from "logical-not";

import { Inject } from "../inject";
import { InjectableConfig } from "../injectable";
import { Injector } from "../injector";
import { ModuleConfig } from "../module";
import { Provider } from "../provide";
import {
    injectableParamsKey,
    injectorModuleKey,
    moduleConfigKey,
    moduleKey,
    providerKey,
} from "./constants";
import { Context } from "./context";
import { Exports } from "./exports";
import { GlobalInjector } from "./global";
import { createInjector } from "./injector";
import { InjectableFactory } from "./interfaces";

export class Module implements InjectableFactory {
    static create(params: {
        SourceClass: any;
        context: Context;
        globalInjector: GlobalInjector;
        injects: any[];
        parentModule?: Module;
    }): Module {
        const {
            SourceClass,
            context,
            globalInjector,
            parentModule,
            injects: externals,
        } = params;

        const module = new Module(context, globalInjector);

        if (parentModule) module.imports.push(parentModule.exports);

        const { imports, exports, injects } = SourceClass[
            moduleConfigKey
        ] as ModuleConfig;

        injects.concat(externals).forEach((item) => {
            if (not(item)) return;

            if (injectableParamsKey in item) {
                module.injector.set(item, null);
            } else if (providerKey in item) {
                const { token, value } = item as Provider;

                module.injector.set(token, value);
            }
        });

        exports.forEach((item) => {
            if (injectableParamsKey in item) {
                module.addExport(item);
            } else if (providerKey in item) {
                const { token, value } = item as Provider;

                module.addExport(token, value);
            }
        });

        imports.forEach((item) => {
            if (not(item)) return;

            if (moduleConfigKey in item) {
                if (not(context.modules.has(item)))
                    context.modules.set(
                        item,
                        Module.create({
                            SourceClass: item,
                            context,
                            globalInjector,
                            injects: [],
                        })
                    );

                const dependency = context.modules.get(item);

                module.imports.push(dependency.exports);
            }
        });

        module.injector.set(
            Injector,
            Object.assign(new Injector(), {
                [injectorModuleKey]: module,
            })
        );

        context.factoryStack.push(module);

        module.instance = new SourceClass();
        module.instance[moduleKey] = module;

        context.factoryStack.pop();

        return module;
    }

    instance: any;
    exports = new Exports(this);

    private injector = createInjector();
    private imports: Exports[] = [];

    private constructor(
        public context: Context,
        public globalInjector: GlobalInjector
    ) {}

    get(token: any): any {
        if (this.injector.has(token)) {
            return this.injector.get(token) || this.instantiate(token);
        }

        for (let injector of this.imports) {
            if (injector.has(token)) {
                return injector.get(token);
            }
        }

        if (this.globalInjector.has(token)) {
            return this.globalInjector.get(token);
        }
    }

    dispose(): void {
        this.instance = null;

        const module = this as any;

        module.context =
            module.rootInjector =
            module.exports =
            module.injector =
            module.imports =
                null;
    }

    private instantiate(token: any): any {
        this.context.factoryStack.push(this);

        const injectableConfig = token[injectableParamsKey] as InjectableConfig;
        const args = injectableConfig.args.map((token, i) =>
            Inject(token, injectableConfig.argsOptions[i])
        );

        const instance = new token(...args);

        this.injector.set(token, instance);

        this.context.factoryStack.pop();

        return instance;
    }

    private addExport(token: any, value: any = null): void {
        this.exports.tokens.add(token);

        if (not(this.injector.has(token))) this.injector.set(token, value);
    }
}
