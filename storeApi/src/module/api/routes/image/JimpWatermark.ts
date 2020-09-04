export default class JimpWatermark {
    private readonly _options: any;

    constructor() {
    }

    protected async before(context: any, next: any): Promise<any> {

        await next();
    }

    protected async after(context: any, next: any): Promise<any> {

        await next();
    }
}
