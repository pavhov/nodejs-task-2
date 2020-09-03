import { modules } from "../abstract/CommonModule";

export default function ModuleInt<T extends { new(...args: any[]): {} }>(constructor: T) {
    modules.push(constructor);
}
