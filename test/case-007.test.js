const {
    bootstrap,
    Inject,
    InjectionToken,
    Module,
    provide,
} = require("../package/implementation");

const token = new InjectionToken();
const value = {};

class MainModule {
    value = Inject(token);

    constructor() {
        if (this.value === value) success();
    }
}

Module(MainModule, {
    injects: [provide(token, value)],
});

bootstrap(MainModule);
