const {
    bootstrap,
    Inject,
    Injectable,
    Injector,
    Module,
} = require("../package/implementation");

class MainComponent {}

Injectable(MainComponent);

class MainModule {
    injector = Inject(Injector);

    constructor() {
        const main = this.injector.create(MainComponent, {
            injects: [MainComponent],
        });

        if (main instanceof MainComponent) success();
    }
}

Module(MainModule);

bootstrap(MainModule);
