const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class Test {
    constructor() {
        success();
    }
}
Injectable(Test);

class TestModule {
    test = Inject(Test);
}
Module(TestModule, { injects: [Test] });

bootstrap(TestModule);
