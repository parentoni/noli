import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";

/**
 * Type for the response of the stripe payment intent succeeded webhook.
 * */
export type StripePaymentIntentSuccededResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>
