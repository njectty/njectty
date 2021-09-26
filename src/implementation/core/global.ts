import { InjectableConfig } from "../injectable";
import { injectableParamsKey } from "./constants";
import { Context } from "./context";
import { createInjector } from "./injector";
import { InjectableFactory } from "./interfaces";

export class GlobalInjector implements InjectableFactory {
    private injector = createInjector();

    constructor(private context: Context) {}

    has(token: any): boolean {
        return this.injector.has(token) || this.add(token);
    }

    get(token: any): any {
        return this.injector.get(token) || this.instantiate(token);
    }

    private add(token: any): boolean {
        const injectableParams = token[injectableParamsKey] as InjectableConfig;

        if (injectableParams.opts.global) {
            this.injector.set(token, null);

            return true;
        }

        return false;
    }

    private instantiate(token: any): any {
        const instance = this.context.create(this, token);

        this.injector.set(token, instance);

        return instance;
    }
}
