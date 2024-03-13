import { Secrets } from "../../../../config/secretsManager";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AuthenticatedRequest } from "../../../../shared/infra/http/utils/Middleware";
import { Store } from "../../../store/domain/store";
import { UserMapper } from "../../../user/mappers/userMapper";
import { PaymentMapper } from "../../mappers/paymentMapper";
import { CreatePaymentIntentUseCase } from "./createPaymentIntentUseCase";
import { Request, Response } from "express";

/**
 * 
 * @class CreatePaymentIntentController
 * @classdesc Test controller for creating a payment intent.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class CreatePaymentIntentController extends BaseController<AuthenticatedRequest> {
  private createPaymentIntentUseCase: CreatePaymentIntentUseCase;

  constructor(createPaymentIntentUseCase: CreatePaymentIntentUseCase) {
    super();
    this.createPaymentIntentUseCase = createPaymentIntentUseCase;
  }

  protected async executeImpl(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (Secrets.NODE_ENV === "production") {
      this.notFound(res)
      return;
    }


    // get user
    const user = req.user 
    const store = {id: new UniqueGlobalId()} as unknown as Store
    const amount = req.body.amount

    // create payment
    const response = await this.createPaymentIntentUseCase.execute({
      user: user,
      store: store,
      amount: amount
    })

    if (response.isLeft()) {
      this.errorHandler(res, response.value)
    } else {
      this.ok(res, {clientSecret: response.value.clientSecret})  
    }
  }

}
