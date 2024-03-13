import { UseCase } from "../../../../shared/core/UseCase";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { left, right } from "../../../../shared/core/result";
import { IPaymentRepo } from "../../repo/IPaymentRepo";
import { StripePaymentIntentSuccededDTO } from "./stripePaymentIntentSucceededDTO";
import { StripePaymentIntentSuccededResponse } from "./stripePaymentIntentSucceededResponse";

/**
 * 
 * @class StripePaymentIntentSucceededUseCase
 * @classdesc Use case for handling the stripe payment intent succeeded event. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export  class StripePaymentIntentSucceededUseCase implements UseCase<StripePaymentIntentSuccededDTO, StripePaymentIntentSuccededResponse> {
  paymentRepo: IPaymentRepo;

  /**
   * Injects the payment repository.
   * */
  constructor(paymentRepo: IPaymentRepo) {
    this.paymentRepo = paymentRepo;
  }

  /**
   * @param {StripePaymentIntentSuccededDTO} request 
   *
   */
  async execute(request: StripePaymentIntentSuccededDTO): Promise<StripePaymentIntentSuccededResponse> {

    // get the payment by the external id
    const repoResponse = await this.paymentRepo.findPaymentByExternalId(request.paymentIntent.id);

    if (repoResponse.isLeft() || repoResponse.value === null) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: "Payment was not found",
        location: "StripePaymentIntentSucceededUseCase",
        variable: "request.paymentIntent.id"
      }))
    }

    // if the payment was found, update the payment status to succeeded
    const payment = repoResponse.value;
    payment.pay()

    // save the payment
    await this.paymentRepo.upsert(payment);
    return right(null);
  }
}
