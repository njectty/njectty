const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class TestComponent {}

Injectable(TestComponent);

class OptionalComponent {}

Injectable(OptionalComponent);

class MainComponent {
    constructor(test, optional) {
        if (test instanceof TestComponent && typeof optional === "undefined")
            success();
    }
}

Injectable(MainComponent, {
    args: [TestComponent, OptionalComponent],
    argsOptions: [null, { optional: true }],
});

class MainModule {
    main = Inject(MainComponent);
}

Module(MainModule, { injects: [MainComponent, TestComponent] });

bootstrap(MainModule);
