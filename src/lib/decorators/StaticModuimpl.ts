import { staticModules } from "../abstract/CommonModule";

export default function StaticModuleImpl<M extends any>(...module: M[]) {
    return function x<T extends { new(...args: any[]): {} }>(constructor: T) {
        (constructor as any).instance.staticModules.push(...staticModules.map(value => value.Instance()));
    };
}
