import { not } from "logical-not";

import { injectContextKey } from "./core/constants";
import { Context } from "./core/context";

export interface InjectConfig {
    optional: boolean;
}

export function Inject(token: any, config?: InjectConfig): any {
    const context = (Inject as any)[injectContextKey] as Context;
    const instance = context.get(token);

    if (instance) return instance;

    if (not(config?.optional)) {
        const name = typeof token === "function" ? token.name : String(token);

        throw new Error(`can't find [${name}]`);
    }
}
