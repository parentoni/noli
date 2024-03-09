import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { Payment } from "../domain/payment";

/**
 * Interace to be implemented by the Payment repos.
 *
 * @class IPaymentRepo
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export interface IPaymentRepo {

  /**
   * Upsert (create or update) a payment.
   * @param {Payment} payment
   * @returns {Promise<Either<CommonUseCaseResult.UnexpectedError, null>>}
   *
   * */
  upsert: (payment: Payment) => Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, null>>,

  /**
   * Find all payments by user id.
   * @param {string} userId
   * @returns {Promise<Either<CommonUseCaseResult.UnexpectedError, Payment[]>>}
   * */
  findPaymentByUserId: (userId: string) => Promise<Either<CommonUseCaseResult.UnexpectedError, Payment[]>>,

  /**
   * Find payment by external id.
   * @param {string} externalId
   * @returns {Promise<Either<CommonUseCaseResult.UnexpectedError, Payment>>}
   * */
  findPaymentByExternalId: (externalId: string) => Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, Payment | null>>,
}
