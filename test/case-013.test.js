const {
    bootstrap,
    Inject,
    Injectable,
    Module,
} = require("../package/implementation");

class SubChildComponent {}

Injectable(SubChildComponent);

class SubChildModule {}

Module(SubChildModule, { exports: [SubChildComponent] });

class ChildComponent {
    subChild = Inject(SubChildComponent);
}

Injectable(ChildComponent);

class ChildModule {}

Module(ChildModule, { imports: [SubChildModule], exports: [ChildComponent] });

class TestComponent {}

Injectable(TestComponent);

class MainComponent {
    child = Inject(ChildComponent);
    test = Inject(TestComponent);
    subChild = Inject(SubChildComponent);

    constructor() {
        const ok =
            this.child instanceof ChildComponent &&
            this.child.subChild instanceof SubChildComponent &&
            this.test instanceof TestComponent &&
            this.subChild instanceof SubChildComponent;

        if (ok) success();
    }
}

Injectable(MainComponent);

class MainModule {
    main = Inject(MainComponent);
}

Module(MainModule, {
    imports: [ChildModule, SubChildModule],
    injects: [MainComponent, TestComponent],
});

bootstrap(MainModule);
