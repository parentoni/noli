import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { IPayment } from "../../../shared/infra/database/models/Payment";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { Payment } from "../domain/payment";
import { PaymentProviderId } from "../domain/paymentProps/paymentProviderId";

/**
 * 
 * @class PaymentMapper
 * @classdesc Class responsible for mapping the payment data to the payment entity and vice versa.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class PaymentMapper {

  /**
   * Map persistent payment to domain payment.
   * @param {IPayment} persistent 
   * @returns {Either<CommonUseCaseResult.InvalidValue, Payment>}
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public static toDomain(persistent: IPayment): Either<CommonUseCaseResult.InvalidValue, Payment> {

    // create props
    const user = UniqueGlobalId.createExisting(persistent.user.toString());
    const store = UniqueGlobalId.createExisting(persistent.store.toString());
    const externalId = UniqueGlobalId.createExisting(persistent.externalId.toString());
    const provider = PaymentProviderId.create({providerId: persistent.provider});

    // check props
    const combineResult = EitherUtils.combine([user, externalId, provider]);
    if (combineResult.isLeft()) {
      return left(combineResult.value);
    }

    // create payment
    const paymentOrError = Payment.create({
      externalId: externalId.getRight(),
      store: store.getRight(),
      user: user.getRight(),
      provider: provider.getRight(),
      amount: persistent.amount,
      payed: persistent.payed
    }, new UniqueGlobalId(persistent._id.toString()));

    if (paymentOrError.isLeft()) {
      return left(paymentOrError.value);
    }

    // return payment
    return right(paymentOrError.value)
  }

  /**
   * Map domain payment to persistent payment.
   * @param {Payment} domain 
   * @returns {IPayment}
   */
  public static toPersistent(domain: Payment): Either<CommonUseCaseResult.InvalidValue, IPayment>{

    // check if payment was created at the provider.
    if (domain.externalId === null) {
      return left(CommonUseCaseResult.InvalidValue.create({
        errorMessage: 'Cannot save payments without external id.',
        variable: 'EXTERNAL_ID',
        location: 'PaymentMapper.toPersistent'
      }))
    }

    return right({
      externalId: domain.externalId.toValue(),
      user: domain.user.toValue(),
      store: domain.store.toValue(),
      provider: domain.provider.value,
      amount: domain.amount,
      payed: domain.payed,
      _id: domain.id.toValue()
    })

  }

  /**
   * Map domain payment to persistent payment.
   * @param persistentBulk {IPayment[]}
   * @returns {Payment[]}
   */
  public static toDomainBulk(persistentBulk: IPayment[]): Payment[] {
    const domainArray: Payment[] = [];

    // iterate thorugh the persistent bulk.
    for (const persistent of persistentBulk) {
      const domainOrError = this.toDomain(persistent);
      if (domainOrError.isRight()) {
        domainArray.push(domainOrError.value);
      }
    }

    // return domain array.
    return domainArray;
  }

  /**
   * Map domain payment to persistent payment.
   * @param domainBulk {Payment[]}
   * @returns {IPayment[]}
   */
  public static toPersistentBulk(domainBulk: Payment[]): IPayment[] {
    const persistentArray: IPayment[] = [];

    // iterate thorugh the domain bulk.
    for (const domain of domainBulk) {
      const persistentOrError = this.toPersistent(domain)
      if (persistentOrError.isRight()) {
        persistentArray.push(persistentOrError.value);
      }

    }

    // return persistent array.
    return persistentArray;
  }
}
