import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { Payment } from "../domain/payment";

/**
 * List of all supported payment providers. 
 */
export enum PAYMENT_PROVIDERS {
    STRIPE = "STRIPE"
}

export type CreatePaymentIntentResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>>

/**
 * Props for creating a payment intent. 
 *
 * @param {Payment} payment - The payment to create the intent for.
 * @typeParam {T} config - The configuration for the payment provider.
 */
export type CreatePaymentIntentProps<T> = {
  payment: Payment
  config: T 
}
/**
 * Interface for the payment provider.
 * Should be implemented by all payment providers.
 */
export abstract class IPaymentProvider<T> {

  /**
   * Creates a payment intent on the payment provider.
   *
   * @param {Payment} props - The payment to create the intent for.
   * @returns {CreatePaymentIntentResponse}
   */
  abstract createPaymentIntent(props: CreatePaymentIntentProps<T>): CreatePaymentIntentResponse
}
