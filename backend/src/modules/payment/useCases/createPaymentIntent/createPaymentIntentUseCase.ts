import { UseCase } from "../../../../shared/core/UseCase";
import { left, right } from "../../../../shared/core/result";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { Payment } from "../../domain/payment";
import { PaymentProviderId } from "../../domain/paymentProps/paymentProviderId";
import { IPaymentRepo } from "../../repo/IPaymentRepo";
import { IPaymentProvider } from "../../services/IPaymentProviders";
import { CreatePaymentIntentDTO } from "./createPaymentIntentDTO";
import { CreatePaymentIntentResponse } from "./createPaymentIntentRespoonse";

/**
 * 
 * @class CreatePaymentIntentUseCase
 * @classdesc Use case for creating a payment intent. Should create the payment domain, call the payment provider, and if successful, save the payment in the database. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class CreatePaymentIntentUseCase implements UseCase<CreatePaymentIntentDTO, CreatePaymentIntentResponse> {
  paymentProvider: IPaymentProvider;
    paymentRepo: IPaymentRepo;

  /**
   * Injects the payment provider into the use case.
   * @param {IPaymentProvider} paymentProvider 
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  constructor(paymentProvider: IPaymentProvider, paymentRepo: IPaymentRepo) {
    this.paymentProvider = paymentProvider
    this.paymentRepo = paymentRepo
  }


  /**
   * @param {CreatePaymentIntentDTO} request 
   * @returns {CreatePaymentIntentResponse} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  async execute(request: CreatePaymentIntentDTO): CreatePaymentIntentResponse {

    // Create payment provider identification
    const paymentProviderId = PaymentProviderId.create({providerId: this.paymentProvider.provider})
    if (paymentProviderId.isLeft()) {
      return left(paymentProviderId.value) 
    }

    // Create local payment
    const payment = Payment.create({
        externalId: null,
        store: request.store.id,
        provider: paymentProviderId.getRight(),
        user: request.user.id,
        amount: request.amount,
        payed: false
    })

    if (payment.isLeft()) {
      return left(payment.value)
    }

    // Call payment provider
    const paymentIntent = await this.paymentProvider.createPaymentIntent({
      payment: payment.value,
      destinationId: 'acct_1Or6W2E4kN1UmJo8' //! temporary
      // destinationId: request.store.destinatioId //Implement this
    })
    if (paymentIntent.isLeft()) {
      return left(paymentIntent.value)
    }

    // create a definitive payment
    const definitivePayment = Payment.create({
      externalId: UniqueGlobalId.createExisting(paymentIntent.value.externalId).getRight(),
      store: request.store.id,
      provider: paymentProviderId.getRight(),
      user: request.user.id,
      amount: request.amount,
      payed: false
    })

    if (definitivePayment.isLeft()) {
      return left(definitivePayment.value)
    }

    // Save payment
    const savePayment = await this.paymentRepo.upsert(definitivePayment.value)
    if (savePayment.isLeft()) {
      return left(savePayment.value)
    }

    // Return definitive payment 
    return right({payment: definitivePayment.value,clientSecret: paymentIntent.value.clientSecret})

  }
}
