import Application                from "./lib/decorators/Application";
import ModuleImpl                 from "./lib/decorators/ModuleImpl";
import ApplicationRunner          from "./lib/abstract/ApplicationRunner";
import { modules, staticModules } from "./lib/abstract/CommonModule";
import StaticModuleImpl           from "./lib/decorators/StaticModuimpl";

@ModuleImpl(...modules)
@StaticModuleImpl(...staticModules)
@Application("nodejs-task-2")
class Main extends ApplicationRunner<Main> {
    async main(): Promise<void> {
        await Promise.all([
            ...this.modules.map((value) => {
                return value.start();
            }),
            ...this.staticModules.map((value) => {
                return value.init();
            }),
        ]);
    }

    async shutdown(): Promise<void> {
        await Promise.all(this.modules.map(value => value.stop()));
    }

}
