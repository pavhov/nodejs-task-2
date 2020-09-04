import IApplication      from "../interfaces/Application";
import CommonStory       from "./CommonModule";
import CommonStaticStory from "./CommonStaticStory";

export default abstract class ApplicationRunner<M extends IApplication<M> | any> implements IApplication<any> {
    static instance: ApplicationRunner<IApplication<any>>;

    protected modules: Array<CommonStory> = [];
    protected staticModules: Array<CommonStaticStory> = [];

    abstract main(): void;

    abstract shutdown(): void;

}
