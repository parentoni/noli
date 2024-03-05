import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import PaymentModel from "../../../../shared/infra/database/models/Payment";
import { Payment } from "../../domain/payment";
import { PaymentMapper } from "../../mappers/paymentMapper";
import { IPaymentRepo } from "../IPaymentRepo";

/**
 * 
 * @class PaymentMongoRepo
 * @classdesc Mongo implementation of the Payment repo.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class PaymentRepoMongo implements IPaymentRepo {

  async upsert(payment: Payment): Promise<Either<CommonUseCaseResult.UnexpectedError, null>> {
    try {
      // map payment to persistent
      const persistentPayment = PaymentMapper.toPersistent(payment);

      // upsert payment
      await PaymentModel.updateOne({ _id: persistentPayment._id }, persistentPayment, { upsert: true }); 

      // return success
      return right(null)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }

  }
  findPaymentByUserId(userId: string): Promise<Either<CommonUseCaseResult.UnexpectedError, Payment[]>> {
    throw new Error("Method not implemented.");
  }
  findPaymentByExternalId(externalId: string): Promise<Either<CommonUseCaseResult.UnexpectedError, Payment>> {
    throw new Error("Method not implemented.");
  }
}

