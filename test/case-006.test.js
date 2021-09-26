const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class MainComponent {}

Injectable(MainComponent);

class MainModule {
    main = Inject(MainComponent, { optional: true });

    constructor() {
        if (typeof this.main === "undefined") success();
    }
}

Module(MainModule);

bootstrap(MainModule);
