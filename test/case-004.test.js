const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class GlobalService {}

Injectable(GlobalService, { opts: { global: true } });

class MainComponent {
    service = Inject(GlobalService);

    constructor() {
        if (this.service instanceof GlobalService) success();
    }
}

Injectable(MainComponent);

class MainModule {
    main = Inject(MainComponent);
}

Module(MainModule, { injects: [MainComponent] });

bootstrap(MainModule);
