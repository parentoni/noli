import { Guard } from "../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../shared/core/result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { PaymentProviderId } from "./paymentProps/paymentProviderId";

/**
 * Props for payment aggregate root.
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 *
 * @property externalId {UniqueGlobalId} - External identification of payment. Should be waiting until payment is created at the provider.
 * @property user {UniqueGlobalId} - User responsible for payment. 
 * @property store {UniqueGlobalId} - Store in which the payment was made.
 * @property provider {PaymentProviderId} - Payment provider identification. ex: STRIPE, PAYPAL, etc.
 * @property amount {number} - Amount of payment. Value in normal int. NOT CENTS.
 * @property payed {boolean} - Payment status. True if payed, false if not.
 */
export type PaymentProps = {
  externalId: UniqueGlobalId | null;
  store: UniqueGlobalId;
  user: UniqueGlobalId;
  provider: PaymentProviderId;
  amount: number;
  payed: boolean;
}

/**
 * 
 * @class Payment
 * @classdesc Payment aggregate root.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class Payment extends AggregateRoot<PaymentProps> {
 
  get externalId(): UniqueGlobalId | null {
    return this.props.externalId ;
  }

  get user(): UniqueGlobalId {
    return this.props.user;
  }

  get provider(): PaymentProviderId {
    return this.props.provider;
  }

  get amount(): number {
    return this.props.amount;
  }

  get payed(): boolean {
    return this.props.payed;
  }

  get store(): UniqueGlobalId {
    return this.props.store;
  }

  /**
   * Validate and create a new payment aggregate root.
   * @param {PaymentProps} props 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public static create(props: PaymentProps, id?: UniqueGlobalId): Either<CommonUseCaseResult.InvalidValue, Payment> { 

    // check for invalid values.
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.externalId, argumentName: 'EXTERNAL_ID' },
      { argument: props.user, argumentName: 'USER' },
      { argument: props.store, argumentName: 'STORE' },
      { argument: props.provider, argumentName: 'PROVIDER' },
      { argument: props.amount, argumentName: 'AMOUNT' },
      { argument: props.payed, argumentName: 'PAYED' }
    ])
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    return right(new Payment(props, id))
  }


}
