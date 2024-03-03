import { Payment, PaymentProps } from '../../../../../src/modules/payment/domain/payment'
import { PaymentProviderId } from '../../../../../src/modules/payment/domain/paymentProps/paymentProviderId'
import { PAYMENT_PROVIDERS } from '../../../../../src/modules/payment/services/PaymentProviders'
import { UniqueGlobalId } from '../../../../../src/shared/domain/UniqueGlobalD'

describe('Payment aggregate root', () => {
  it('should create a payment', () => {

    const id = new UniqueGlobalId()
    const paymentProviderId = PaymentProviderId.create({ providerId: PAYMENT_PROVIDERS.STRIPE})

    const payment = Payment.create({
      externalId: id,
      user: id,
      provider: paymentProviderId.getRight(),
      amount: 100,
      payed: false
    })


    expect(payment.isRight()).toBeTruthy()

    // dont run if payment is invalid
    if (payment.isLeft()) return

    expect(payment.value.externalId).toBe(id)
    expect(payment.value.user).toBe(id)
    expect(payment.value.provider).toBe(paymentProviderId.getRight())
    expect(payment.value.amount).toBe(100)
    expect(payment.value.payed).toBe(false)

  })

  it('should not create with missing data', () => {
    const payment = Payment.create({
      externalId: undefined, 
      user: undefined,
      provider: undefined,
      amount: undefined,
      payed: null, 
    } as unknown as PaymentProps)

    expect(payment.isLeft()).toBeTruthy()

  })
})

