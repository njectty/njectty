import { noImplementationError } from "./internal/no-implementation-error";

export function Optional(): PropertyDecorator | ParameterDecorator {
    return function () {
        noImplementationError();
    };
}
