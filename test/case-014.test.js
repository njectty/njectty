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

Module(ChildModule);

class ParentModule {}

Module(ParentModule, {
    imports: [ChildModule],
    exports: [TestComponent],
});

bootstrap(ParentModule);
