import "../../module";

export default function ModuleImpl<M extends any>(...module: M[]) {
    return function x<T extends { new(...args: any[]): {} }>(constructor: T) {
        (constructor as any).instance.modules.push(...module.map(value => new (value as any)()));
    };
}
