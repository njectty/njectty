const {
    bootstrap,
    Inject,
    InjectionToken,
    Module,
    provide,
} = require("../package/implementation");

const token = new InjectionToken();
const value = {};

class ChildModule {
    static provide(injects) {
        return {
            module: ChildModule,
            injects,
        };
    }

    value = Inject(token);

    constructor() {
        if (this.value === value) success();
    }
}

Module(ChildModule);

class MainModule {}

Module(MainModule, {
    imports: [ChildModule.provide([provide(token, value)])],
});

bootstrap(MainModule);
