import formidable, { File, IncomingForm } from "formidable";

export default class FileUpload {
    private readonly _options: IncomingForm;

    constructor() {
        this._options = {
            multiples: false,
            keepExtensions: true,
            hash: "sha1",
            uploadDir: `${process.cwd()}/upload`,
        } as IncomingForm;
    }

    protected async before(context: any, next: any): Promise<any> {
        // @ts-ignore
        const form = formidable(this._options);
        const contentType = context.req.headers["content-type"] || "";

        context.state = {
            ...context.state,
            body: context.request.body,
            query: context.request.query,
            params: context.request.params,
            file: {},
            form: {},
        };

        if (!contentType.includes("multipart")) {
            return next();
        }

        await new Promise((resolve, reject) => {
            form.once("error", reject);
            form.on("file", (fieldName: string, file: File) => {
                return context.state.file = {
                    name: file.hash,
                    path: file.path,
                };
            });
            form.on("field", (fieldName: string, fieldValue: any) => context.state.form[fieldName] = fieldValue);
            form.once("end", resolve);
            form.parse(context.req);
        });

        await next();
    }

    protected async after(context: any, next: any): Promise<any> {
        await next();
    }

}
