const {
    bootstrap,
    Inject,
    InjectionToken,
    Module,
    provide,
} = require("../package/implementation");

const parentToken = new InjectionToken();
const childToken = new InjectionToken();

class ChildModule {}

Module(ChildModule, {
    exports: [
        provide(parentToken, "ChildModule"),
        provide(childToken, "ChildModule"),
    ],
});

class MainModule {
    parentValue = Inject(parentToken);
    childValue = Inject(childToken);

    constructor() {
        const ok =
            this.parentValue === "ParentModule" &&
            this.childValue === "ChildModule";

        if (ok) success();
    }
}

Module(MainModule, {
    imports: [ChildModule],
});

class ParentModule {}

Module(ParentModule, {
    imports: [MainModule],
    exports: [provide(parentToken, "ParentModule")],
});

bootstrap(ParentModule);
