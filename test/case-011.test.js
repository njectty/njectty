const {
    bootstrap,
    Inject,
    Injectable,
    Injector,
    Module,
} = require("../package/implementation");

class TestComponent {}

Injectable(TestComponent);

class TestModule {
    test = Inject(TestComponent);

    constructor() {}
}

Module(TestModule, { injects: [TestComponent] });

class MainModule {
    injector = Inject(Injector);

    constructor() {
        const module = this.injector.mount(TestModule);

        if (module.test instanceof TestComponent) success();
    }
}

Module(MainModule);

bootstrap(MainModule);
