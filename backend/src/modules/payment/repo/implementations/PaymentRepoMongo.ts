import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import PaymentModel, { IPayment } from "../../../../shared/infra/database/models/Payment";
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

  async upsert(payment: Payment): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, null>> {
    try {
      // map payment to persistent
      const persistentPayment = PaymentMapper.toPersistent(payment);

      if (persistentPayment.isLeft()) {
        return left(persistentPayment.value);
      }

      // upsert payment
      await PaymentModel.updateOne({ _id: persistentPayment.value._id }, persistentPayment.value, { upsert: true }); 

      // return success
      return right(null)
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }

  }
  async findPaymentByUserId(userId: string): Promise<Either<CommonUseCaseResult.UnexpectedError, Payment[]>> {
    try {
      // find payments and transform to object
      const allPayments = await PaymentModel.find({ user: userId });
      const objectPayments = allPayments.map(p => p.toObject() as IPayment);

      // map to domain
      const payment = PaymentMapper.toDomainBulk(objectPayments);

      return right(payment);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
  async findPaymentByExternalId(externalId: string): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, Payment | null>> {
    try {
      // find payment
      const payment = await PaymentModel.findOne({ externalId: externalId });
      if (!payment || payment === null) {
        return right(null);
      }

      // map to domain
      const domainPayment = PaymentMapper.toDomain(payment.toObject() as IPayment);
      if (domainPayment.isLeft()) {
        return left(domainPayment.value);
      }

      return right(domainPayment.value);
    }
    catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}

