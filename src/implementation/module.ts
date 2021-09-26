import { not } from "logical-not";

import { moduleConfigKey } from "./core/constants";

export interface ModuleConfig {
    imports: any[];
    exports: any[];
    injects: any[];
}

export function Module(T: any, config?: Partial<ModuleConfig>) {
    if (not(T)) return;

    Object.defineProperty(T, moduleConfigKey, {
        value: Object.seal({
            imports: config?.imports || [],
            exports: config?.exports || [],
            injects: config?.injects || [],
        } as ModuleConfig),
    });
}
