import { noImplementationError } from "./internal/no-implementation-error";

export function Module(config?: {
    imports?: any[];
    exports?: any[];
    injects?: any[];
}): ClassDecorator {
    return function () {
        noImplementationError();
    };
}

export interface StaticInjectableModule {
    module: any;
    injects: any[];
}
