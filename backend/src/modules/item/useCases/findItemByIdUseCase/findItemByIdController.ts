import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { findItemByIdUseCase } from ".";
import { left, right } from "../../../../shared/core/result";

export class FindItemByIdController extends BaseController<Request> {

    async executeImpl(req: Request, res: Response): Promise<any> {
        const props = req.params

        const response = await findItemByIdUseCase.execute(props.id as string)

        if (response.isLeft()) {
            return this.errorHandler(res, response.value)
        }
        return right(this.ok(res, response.value))
    }
}