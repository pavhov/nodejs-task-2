import Module            from "../interfaces/Module";
import CommonStaticStory from "./CommonStaticStory";

export const modules: Array<any> = [];
export const staticModules: Array<any> = [];
export const jobModules: Array<any> = [];

export default abstract class CommonModule implements Module {
    protected p: NodeJS.Process;

    protected staticModules: Array<CommonStaticStory> = [];

    protected constructor() {
        this.p = process;
    }

    async init(): Promise<void> {
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
