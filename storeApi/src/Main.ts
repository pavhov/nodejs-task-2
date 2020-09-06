import Application                from "./lib/decorators/Application";
import ModuleImpl                 from "./lib/decorators/ModuleImpl";
import JobModuleImpl              from "./lib/decorators/JobModuimpl";
import ApplicationRunner          from "./lib/abstract/ApplicationRunner";
import { modules, staticModules, jobModules } from "./lib/abstract/CommonModule";

@ModuleImpl(...modules)
@JobModuleImpl(...jobModules)
@Application("nodejs-task-2")
class Main extends ApplicationRunner<Main> {
    async main(): Promise<void> {
        await Promise.all(this.modules.map(async (value) => await value.init()));
        await Promise.all(this.jobModules.map(async (value) => await value.init()));
    }

    async shutdown(): Promise<void> {
        await Promise.all(this.modules.map(value => value.stop()));
    }

}
