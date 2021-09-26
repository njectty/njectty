import { not } from "logical-not";

import { providerKey } from "./core/constants";
import { InjectionToken } from "./injection-token";

export interface Provider {
    [providerKey]: true;
    token: InjectionToken<any>;
    value: any;
}

export function provide<T>(token: InjectionToken<T>, value: T): any {
    if (not(token instanceof InjectionToken)) return;

    const item: Provider = {
        [providerKey]: true,
        token,
        value,
    };

    return Object.seal(item);
}
