import { Secrets } from "../../../../../config/secretsManager"
import { CommonUseCaseResult } from "../../../../../shared/core/response/useCaseError"
import { left, right } from "../../../../../shared/core/result"
import { CreatePaymentIntentProps, CreatePaymentIntentResponse, IPaymentProvider, PAYMENT_PROVIDERS } from "../../IPaymentProviders"
import Stripe from "stripe"
/**
 * Stripe configureation type.
 *
 * @param {string} connectedAccountId - The stripe account id for the destination account. See connected accounts in stripe. 
 */
export type StripeConfiguration = {
  connectedAccountId: string
}

/**
 * @class Stripe
 * @classdesc stripe payment provider. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class StripeProvider implements IPaymentProvider {
  provider = PAYMENT_PROVIDERS.STRIPE
  stripe: Stripe

  // Inject the stripe instance.
 constructor(stripe: Stripe) {
    this.stripe = stripe
  }

  async createPaymentIntent(props: CreatePaymentIntentProps): CreatePaymentIntentResponse {
    try {
      const response = await this.stripe.paymentIntents.create({
          amount: props.payment.amount * 100, // transform to cents
          currency: "BRL",
          transfer_data: {
            destination: props.destinationId
          }
      }) 

      return right(response.id)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }

}
