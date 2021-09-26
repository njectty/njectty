import { noImplementationError } from "./internal/no-implementation-error";

export function Inject(token: any): PropertyDecorator | ParameterDecorator {
    return function () {
        noImplementationError();
    };
}
