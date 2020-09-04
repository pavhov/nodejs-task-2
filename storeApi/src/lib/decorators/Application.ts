import ApplicationRunner from "../abstract/ApplicationRunner";

export default function Application(name: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const impl = constructor as any;

        if (impl.instance) {
            (impl.instance as ApplicationRunner<T>).main();
            return;
        }

        impl.instance = ((new impl()) as ApplicationRunner<T>);
        impl.instance.name = name;
        setImmediate(async () => {
            try {
                await impl.instance.main()
            } catch (e) {
                console.error(e);
                process.exit(1);
            }
        });
    };
}
