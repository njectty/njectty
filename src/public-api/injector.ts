export declare class Injector {
    create(injectable: any, params?: { injects: any[] }): any;
    mount(module: any, params?: { injects: any[] }): void;
    unmount(module: any): any;
}
