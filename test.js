const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("./package/implementation");

class TestComponent {}

Injectable(TestComponent);

class ChildModule {}

Module(ChildModule, {
    exports: [TestComponent],
});

class IntermediateModule {}

Module(IntermediateModule, { imports: [ChildModule] });

class MainModule {
    test = Inject(TestComponent);

    constructor() {
        if (this.test instanceof TestComponent) success();
    }
}

Module(MainModule, { imports: [IntermediateModule] });

bootstrap(MainModule);

function success() {
    console.log("OK");
}
