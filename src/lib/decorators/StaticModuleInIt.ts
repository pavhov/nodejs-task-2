import { staticModules } from "../abstract/CommonModule";

export default function StaticModuleInIt<T extends { new(...args: any[]): {} }>(constructor: T) {
    staticModules.push(constructor);
}
