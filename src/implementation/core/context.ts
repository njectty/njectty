import { Inject } from "../inject";
import { injectContextKey } from "./constants";
import { InjectableFactory } from "./interfaces";

export class Context implements InjectableFactory {
    modules = new Map<any, any>();
    factoryStack = new FactoryStack();

    create(factory: InjectableFactory, token: any): void {
        this.factoryStack.push(factory);

        const instance = new token();

        this.factoryStack.pop();

        return instance;
    }

    get(token: any): any {
        return this.factoryStack.get(token);
    }
}

class FactoryStack implements InjectableFactory {
    private stack: InjectableFactory[] = [];

    push(factory: InjectableFactory): void {
        (Inject as any)[injectContextKey] = this;

        this.stack.push(factory);
    }

    pop(): void {
        this.stack.pop();
    }

    get(token: any): any {
        const factory = this.stack[this.stack.length - 1];

        return factory.get(token);
    }
}
