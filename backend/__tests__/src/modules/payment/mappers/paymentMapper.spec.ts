import { UniqueGlobalId } from "../../../../../src/shared/domain/UniqueGlobalD"
import { PaymentProviderId } from "../../../../../src/modules/payment/domain/paymentProps/paymentProviderId"
import { PAYMENT_PROVIDERS } from "../../../../../src/modules/payment/services/IPaymentProviders"
import { PaymentMapper } from "../../../../../src/modules/payment/mappers/paymentMapper"
import { Payment } from "../../../../../src/modules/payment/domain/payment"

export const createMockPersistentPayment = () => {
  return {
    externalId: 'external',
    user: '65e50e7b6c10c6ddf83b9ad4',
    provider: PAYMENT_PROVIDERS.STRIPE,
    amount: 1000,
    payed: false,
    _id: '65e50e7b6c10c6ddf83b9ad4'
  }
}

export const createMockDomainPayment = () => {
  return Payment.create({
    externalId: UniqueGlobalId.createExisting('external').getRight(),
    user: UniqueGlobalId.createExisting('65e50e7b6c10c6ddf83b9ad4').getRight(),
    provider: PaymentProviderId.create({ providerId: PAYMENT_PROVIDERS.STRIPE }).getRight(),
    amount: 1000,
    payed: false,
  }, new UniqueGlobalId('65e50e7b6c10c6ddf83b9ad4')).getRight()
}

describe('Payment Mapper', () => {

  it('should map a valid persistent to domain', () => {
    const persistent = createMockPersistentPayment()
    const domain = createMockDomainPayment()

    const mapperResponse = PaymentMapper.toDomain(persistent)
    expect(mapperResponse.isRight()).toBeTruthy()
    expect(mapperResponse.value).toEqual(domain)
  })

  it('should fail to map an invalid persistent to domain', () => {
    const persistent = createMockPersistentPayment()
    persistent.provider = 'invalid' as PAYMENT_PROVIDERS

    const mapperResponse = PaymentMapper.toDomain(persistent)
    expect(mapperResponse.isLeft()).toBeTruthy()
  })

  it('should map a valid domain to persistent', () => {
    const persistent = createMockPersistentPayment()
    const domain = createMockDomainPayment()

    const mapperResponse = PaymentMapper.toPersistent(domain)
    expect(mapperResponse).toEqual(persistent)
  })

  it("should map a valid bulk of persistent to domain", () => {
    const persistent = [createMockPersistentPayment(), createMockPersistentPayment(), createMockPersistentPayment()]
    const domain = [createMockDomainPayment(), createMockDomainPayment(),createMockDomainPayment()]

    const mapperResponse = PaymentMapper.toDomainBulk(persistent)
    expect(mapperResponse).toBeTruthy()
    expect(mapperResponse).toEqual(domain)
  })

  it("should map a valid bulk of domain to persistent", () => {
    const persistent = [createMockPersistentPayment(), createMockPersistentPayment(), createMockPersistentPayment()]
    const domain = [createMockDomainPayment(), createMockDomainPayment(),createMockDomainPayment()]

    const mapperResponse = PaymentMapper.toPersistentBulk(domain)
    expect(mapperResponse).toBeTruthy()
    expect(mapperResponse).toEqual(persistent)
  })

})
