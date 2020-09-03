export default interface IApplication<T extends any> {
    main(): void;

    shutdown(): void;
}
