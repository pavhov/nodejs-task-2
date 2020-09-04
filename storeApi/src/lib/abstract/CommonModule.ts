import Module from "../interfaces/Module";

export const modules: Array<any> = [];
export const staticModules: Array<any> = [];

export default abstract class CommonModule implements Module {
    protected p: NodeJS.Process;

    protected constructor() {
        this.p = process;
        modules.push(this);
    }

    async start(): Promise<void> {
        console.log(`Starting ${this.constructor.name} module`);
        this.p.on("exit", (code) => this.stop());
        return await this.context();
    }

    async stop(): Promise<void> {
        return await this.destroy();
    }

    protected abstract async context(): Promise<void>;

    protected abstract async destroy(): Promise<void>;

}
