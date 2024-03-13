import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { Payment } from "../domain/payment";

/**
 * List of all supported payment providers. 
 */

export enum PAYMENT_PROVIDERS {
    STRIPE = "STRIPE"
}

/**
 * Returns external id of the payment intent.
 * @param {string} externalId - The external id of the payment intent.
 * @param {string} clientSecret - The client secret of the payment intent.
 */
export type CreatePaymentIntentResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, {externalId: string, clientSecret: string}>>

/**
 * Props for creating a payment intent. 
 *
 * @param {Payment} payment - The payment to create the intent for.
 * @param {string} moneyDestinationId - The id of the account destination.
 */
export type CreatePaymentIntentProps = {
  payment: Payment
  destinationId: string
}
/**
 * Interface for the payment provider.
 * Should be implemented by all payment providers.
 */
export abstract class IPaymentProvider {

  abstract provider: PAYMENT_PROVIDERS
  /**
   * Creates a payment intent on the payment provider.
   *
   * @param {Payment} props - The payment to create the intent for.
   * @returns {CreatePaymentIntentResponse}
   */
  abstract createPaymentIntent(props: CreatePaymentIntentProps): CreatePaymentIntentResponse
}
