export interface InjectableFactory {
    get(token: any): any;
}
