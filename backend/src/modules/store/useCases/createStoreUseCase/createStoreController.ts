import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateStoreUseCase } from "./createStoreUseCase";
export class CreateStoreController extends BaseController<Request> {
    storeCreateUseCase: CreateStoreUseCase;

    /**
     * Injects the user register use case
     * @param {UserRegisterUseCase} userRegisterUseCase 
     *
     * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
     */
    constructor(createItemUseCase: CreateStoreUseCase) {
      super();
      this.storeCreateUseCase = createItemUseCase;
    }

    public async executeImpl(req: Request, res : Response): Promise<any> {
        try {

            const dto = req.body

            const result = await this.storeCreateUseCase.execute(dto)

            if (result.isLeft()) {
                return this.errorHandler(res, result.value)
            }

            return this.ok(res, result.value)

        }catch (err) {
            return this.fail(res, err)
        }
        
    }
}