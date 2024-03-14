import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetAllStoresUseCase } from "./getAllStoresUseCase";
export class GetAllStoresController extends BaseController<Request> {
    getStoresUseCase : GetAllStoresUseCase;

    /**
     * Injects the user register use case
     * @param {UserRegisterUseCase} userRegisterUseCase 
     *
     * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
     */
    constructor(getStoresUseCase: GetAllStoresUseCase) {
      super();
      this.getStoresUseCase = getStoresUseCase;
    }

    public async executeImpl(req: Request, res : Response): Promise<any> {
        try {

            const result = await this.getStoresUseCase.execute()

            if (result.isLeft()) {
                return this.errorHandler(res, result.value)
            }

            return this.ok(res, result.value)

        }catch (err) {
            return this.fail(res, err)
        }
        
    }
}