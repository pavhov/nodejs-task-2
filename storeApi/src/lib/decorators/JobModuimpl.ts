import { jobModules } from "../abstract/CommonModule";

export default function JobModuleImpl<M extends any>(...module: M[]) {
    return function x<T extends { new(...args: any[]): {} }>(constructor: T) {
        (constructor as any).instance.jobModules.push(...jobModules.map(value => new value()));
    };
}
