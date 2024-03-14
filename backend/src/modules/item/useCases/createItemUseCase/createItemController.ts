import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateItemUseCase } from "./createItemUseCase";

export class CreateItemController extends BaseController<Request> {

    itemCreateUseCase: CreateItemUseCase;

    /**
     * Injects the user register use case
     * @param {UserRegisterUseCase} userRegisterUseCase 
     *
     * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
     */
    constructor(createItemUseCase: CreateItemUseCase) {
      super();
      this.itemCreateUseCase = createItemUseCase;
    }

    public async executeImpl(req: Request, res : Response): Promise<any> {
        try {

            const dto = req.body

            const result = await this.itemCreateUseCase.execute(dto)

            if (result.isLeft()) {
                return this.errorHandler(res, result.value)
            }

            return this.ok(res, result.value)

        }catch (err) {
            return this.fail(res, err)
        }
        
    }
}