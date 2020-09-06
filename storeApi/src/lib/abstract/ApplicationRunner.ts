import IApplication      from "../interfaces/Application";
import CommonStory       from "./CommonModule";
import CommonStaticStory from "./CommonStaticStory";
import JobModuleStory    from "./JobModuleStory";

export default abstract class ApplicationRunner<M extends IApplication<M> | any> implements IApplication<any> {
    static instance: ApplicationRunner<IApplication<any>>;

    protected modules: Array<CommonStory> = [];
    protected jobModules: Array<JobModuleStory> = [];

    abstract main(): void;

    abstract shutdown(): void;

}
