import { not } from "logical-not";

import { injectableParamsKey } from "./core/constants";

export interface InjectableConfig {
    args: any[];
    argsOptions: any[];
    opts: InjectableOptions;
}

export interface InjectableOptions {
    global: boolean;
}

export function Injectable(
    token: any,
    config?: Partial<InjectableConfig>
): void {
    if (not(token)) return;

    Object.defineProperty(token, injectableParamsKey, {
        value: Object.defineProperties(
            {},
            {
                args: {
                    value: Object.seal(
                        Array.isArray(config?.args) ? config!.args : []
                    ),
                },
                argsOptions: {
                    value: Object.seal(
                        Array.isArray(config?.argsOptions)
                            ? config!.argsOptions
                            : []
                    ),
                },
                opts: {
                    value: Object.seal(config?.opts || {}),
                },
            }
        ),
    });
}
