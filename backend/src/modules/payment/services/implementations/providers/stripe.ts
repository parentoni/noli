import { Secrets } from "../../../../../config/secretsManager"
import { CommonUseCaseResult } from "../../../../../shared/core/response/useCaseError"
import { left, right } from "../../../../../shared/core/result"
import { CreatePaymentIntentProps, CreatePaymentIntentResponse, IPaymentProvider } from "../../IPaymentProviders"
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
export class StripeProvider implements IPaymentProvider<StripeConfiguration> {
  stripe: Stripe

  // Inject the stripe instance.
 constructor(stripe: Stripe) {
    this.stripe = stripe
  }

  async createPaymentIntent(props: CreatePaymentIntentProps<StripeConfiguration>): CreatePaymentIntentResponse {
    try {
      await this.stripe.paymentIntents.create({
          amount: props.payment.amount * 100, // transform to cents
          currency: "BRL",
          transfer_data: {
            destination: props.config.connectedAccountId
          }
      }) 

      return right(null)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }
  }

}
