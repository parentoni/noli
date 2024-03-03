import { PaymentProviderId } from "../../../../../src/modules/payment/domain/paymentProps/paymentProviderId";
import { PAYMENT_PROVIDERS } from "../../../../../src/modules/payment/services/PaymentProviders";

describe('PaymentProviderId', () => {

  it('should create a valid payment provider id', () => {
    const paymentProviderId = PaymentProviderId.create({ providerId: 'STRIPE' as PAYMENT_PROVIDERS });

    expect(paymentProviderId.isRight()).toBeTruthy();
    expect(paymentProviderId.value).toBeInstanceOf(PaymentProviderId);
    expect((paymentProviderId.value as PaymentProviderId).value).toBe('STRIPE');
  })

  it('should not create a valid payment provider id', () => {
    const paymentProviderId = PaymentProviderId.create({ providerId: 'INVALID' as PAYMENT_PROVIDERS });

    expect(paymentProviderId.isLeft()).toBeTruthy();
  })
})
