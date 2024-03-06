import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { PAYMENT_PROVIDERS } from "../../services/IPaymentProviders";

/**
 * PaymentProvider props.
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type PaymentProviderIdProps = {
  providerId: PAYMENT_PROVIDERS;
}

/**
 * Class that represents the payment provider type. ex: Stripe, Paypal, etc.
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class PaymentProviderId extends ValueObject<PaymentProviderIdProps> {
 
  get value(): PAYMENT_PROVIDERS {
    return this.props.providerId;
  }

  /**
   * Validate the payment service type.
   * @param {PAYMENT_SERVICES} providerId
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  private static validate(providerId: PAYMENT_PROVIDERS): Either<CommonUseCaseResult.InvalidValue, null> {

    const guardResult = Guard.isOneOf(providerId, Object.values(PAYMENT_PROVIDERS), "PAYMENT_SERVICES")
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    return right(null)
  }

  /**
   * Creates a valid payment service type.
   *
   * @param {PaymentServiceTypeProps} props 
   * @returns {Either<CommonUseCaseResult.InvalidValue, PaymentServiceType>} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public static create(props: PaymentProviderIdProps): Either<CommonUseCaseResult.InvalidValue, PaymentProviderId> {
    const guardResult = this.validate(props.providerId);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    return right(new PaymentProviderId(props));

  }
}
