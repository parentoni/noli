import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";
import { Payment } from "../../domain/payment";

/**
 * List of possible responses from the create payment intent use case.
 *
 * @param {CommonUseCaseResult.InvalidValue} - The request was invalid.
 * @param {CommonUseCaseResult.UnexpectedError} - An unexpected error occurred.
 * @param {Payment} payment - The payment created.
 * @param {string} clientSecret - The client secret of the payment intent.
 * */
export type CreatePaymentIntentResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, {payment: Payment, clientSecret: string}>>
