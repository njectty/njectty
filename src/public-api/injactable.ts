import { noImplementationError } from "./internal/no-implementation-error";

export function Injectable(config?: { global?: boolean }): ClassDecorator {
    return function () {
        noImplementationError();
    };
}
