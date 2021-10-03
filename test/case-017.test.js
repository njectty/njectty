const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class TestComponent {}

Injectable(TestComponent);

class ChildModule {
    test = Inject(TestComponent);

    constructor() {
        if (this.test instanceof TestComponent) success();
    }
}

Module(ChildModule, {
    exports: [TestComponent],
});

class IntermediateModule {}

Module(IntermediateModule, { imports: [ChildModule] });

class MainModule {}

Module(MainModule, { imports: [IntermediateModule], exports: [TestComponent] });

bootstrap(MainModule);
