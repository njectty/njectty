const { bootstrap, Module } = require("../package/implementation");

class TestModule {
    constructor() {
        success();
    }
}
Module(TestModule);

bootstrap(TestModule);
