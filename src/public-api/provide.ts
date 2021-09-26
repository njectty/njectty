import { noImplementationError } from "./internal/no-implementation-error";
import { InjectionToken } from "./injection-token";

export function provide<T>(token: InjectionToken<T>, value: T): any {
    noImplementationError();
}
