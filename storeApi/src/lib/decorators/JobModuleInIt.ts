import { jobModules } from "../abstract/CommonModule";

export default function StaticModuleInIt<T extends { new(...args: any[]): {} }>(constructor: T) {
    jobModules.push(constructor);
}
