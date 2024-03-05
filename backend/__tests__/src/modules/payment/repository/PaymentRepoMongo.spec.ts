import { PaymentMapper } from '../../../../../src/modules/payment/mappers/paymentMapper';
import { PaymentRepoMongo } from '../../../../../src/modules/payment/repo/implementations/PaymentRepoMongo'
import PaymentModel, { IPayment } from '../../../../../src/shared/infra/database/models/Payment';
import { connect, clearDatabase, closeDatabase } from '../../user/repo/db';
import { createMockDomainPayment } from '../mappers/paymentMapper.spec';
const paymentRepo = new PaymentRepoMongo();

describe('PaymentRepoMongo', () => {

  beforeAll(async () => {
    await connect();
  })

  afterEach(async () => {
    await clearDatabase();
  })

  afterAll(async () => {
    await closeDatabase();
  })


  describe("upsert", () => {
    it('should create a new payment', async () => {

      // create payment
      const payment = createMockDomainPayment()
      const response = await paymentRepo.upsert(payment)
      expect(response.isRight()).toBeTruthy()

      // get payment
      const persistedPayment = await PaymentModel.findById(payment.id.toValue())
      expect(persistedPayment).toBeTruthy()


      // check if the payment was persisted correctly
      const domainPersistedPayment = PaymentMapper.toDomain(persistedPayment?.toObject() as IPayment)
      expect(domainPersistedPayment.value).toEqual(payment)
    })

    it('should update a payment', async () => {

      // create payment
      const payment = createMockDomainPayment()
      const response = await paymentRepo.upsert(payment)
      expect(response.isRight()).toBeTruthy()

      // get payment
      const persistedPayment = await PaymentModel.findById(payment.id.toValue())
      expect(persistedPayment).toBeTruthy()

      // update payment
      payment.props.payed = true
      const responseUpdated = await paymentRepo.upsert(payment)
      expect(responseUpdated.isRight()).toBeTruthy()

      // get payment
      const persistedUpdatedPayment = await PaymentModel.findById(payment.id.toValue())
      expect(persistedUpdatedPayment).toBeTruthy()

      // check if the payment was persisted correctly
      const domainPersistedUpdatedPayment = PaymentMapper.toDomain(persistedUpdatedPayment?.toObject() as IPayment)
      expect(domainPersistedUpdatedPayment.value).toEqual(payment)
    })
  })
})
