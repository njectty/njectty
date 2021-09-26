const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class MainComponent {}

Injectable(MainComponent);

class MainModule {
    main = Inject(MainComponent);

    constructor() {
        if (this.main instanceof MainComponent) success();
    }
}

Module(MainModule);

bootstrap(MainModule, {
    injects: [MainComponent],
});
