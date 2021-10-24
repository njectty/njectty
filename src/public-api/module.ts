export declare function Module(config?: {
    imports?: any[];
    exports?: any[];
    injects?: any[];
}): ClassDecorator;

export interface StaticInjectableModule {
    module: any;
    injects: any[];
}
