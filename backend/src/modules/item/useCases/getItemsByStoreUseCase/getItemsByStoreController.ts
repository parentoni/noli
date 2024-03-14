import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { getItemsByStore } from ".";
import { left } from "../../../../shared/core/result";
export class GetItemsByStoreController extends BaseController<Request> {

    async executeImpl(req: Request, res: Response): Promise<any> {
        // Gets id
        const props = req.params
        // Runs usecase
        const response = await getItemsByStore.execute(props.id as string)

        if (response.isLeft()) {
            return this.errorHandler(res, response.value)
        }
        
        return this.ok(res, response.value)
    }

}