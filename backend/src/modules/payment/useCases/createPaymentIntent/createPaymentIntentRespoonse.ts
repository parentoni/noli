import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either } from "../../../../shared/core/result";
import { Payment } from "../../domain/payment";

/**
 * List of possible responses from the create payment intent use case.
 * */
export type CreatePaymentIntentResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Payment>>
