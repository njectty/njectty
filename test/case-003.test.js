const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class ChildComponent {}

Injectable(ChildComponent);

class ChildModule {}

Module(ChildModule, { exports: [ChildComponent] });

class MainComponent {
    child = Inject(ChildComponent);

    constructor() {
        if (this.child instanceof ChildComponent) success();
    }
}

Injectable(MainComponent);

class MainModule {
    main = Inject(MainComponent);
}

Module(MainModule, { imports: [ChildModule], injects: [MainComponent] });

bootstrap(MainModule);
