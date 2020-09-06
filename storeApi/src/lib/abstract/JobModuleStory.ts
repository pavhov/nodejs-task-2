import Module from "../interfaces/Module";

export const modules: Array<any> = [];
export const staticModules: Array<any> = [];
export const jobModules: Array<any> = [];

export default abstract class JobModuleStory implements Module {
    protected p: NodeJS.Process;

    protected constructor() {
        this.p = process;
    }

    async init(): Promise<void> {
        console.log(`Starting ${this.constructor.name} job module`);
        this.p.on("exit", (code) => this.kill());
        return await this.start();
    }

    async kill(): Promise<void> {
        return await this.stop();
    }

    protected abstract async start(): Promise<void>;

    protected abstract async stop(): Promise<void>;

}
