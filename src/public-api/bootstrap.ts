import { noImplementationError } from "./internal/no-implementation-error";

export function bootstrap(module: any, params?: { injects: any[] }): void {
    noImplementationError();
}
