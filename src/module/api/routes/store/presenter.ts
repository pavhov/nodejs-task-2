import { Delete, Get, Post, Presenter } from "../../../../lib/decorators/Koa";

@Presenter({path: "/store"})
export default class ActionsPresenter {
    @Get({path: "/store/:store_id/watermark"})
    getOne() {

    }

    @Post({path: "/store/:store_id/watermark"})
    storeOne() {

    }

    @Delete({path: "/store/:store_id/watermark"})
    deleteOne() {

    }
}
