const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class TestComponent {}

Injectable(TestComponent);

class ChildModule {
    static provide(injects) {
        return {
            module: ChildModule,
            injects,
        };
    }

    test = Inject(TestComponent);

    constructor() {
        if (this.test instanceof TestComponent) success();
    }
}

Module(ChildModule);

class MainModule {}

Module(MainModule, {
    imports: [ChildModule.provide([TestComponent])],
});

bootstrap(MainModule);
