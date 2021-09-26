import { noImplementationError } from "./internal/no-implementation-error";

export class Injector {
    create(injectable: any, params?: { injects: any[] }): any {
        noImplementationError();
    }

    mount(module: any, params?: { injects: any[] }): void {
        noImplementationError();
    }

    unmount(module: any): any {
        noImplementationError();
    }
}
