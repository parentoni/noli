import { StripeProvider } from "../../../../../src/modules/payment/services/implementations/providers/stripe"; 
import { PaymentRepoMongo } from "../../../../../src/modules/payment/repo/implementations/PaymentRepoMongo";
import { createMockDomainPayment } from "../mappers/paymentMapper.spec";
import Stripe from "stripe";
import { createMockEntityUser } from "../../user/mapper/userMapper.spec";
import { Store } from "../../../../../src/modules/store/domain/store";
import { CreatePaymentIntentUseCase } from "../../../../../src/modules/payment/useCases/createPaymentIntent/createPaymentIntentUseCase";
import { left, right } from "../../../../../src/shared/core/result";
import { IPaymentProvider } from "../../../../../src/modules/payment/services/IPaymentProviders";
import { IUser } from "../../../../../src/shared/infra/database/models/User";
import { User } from "../../../../../src/modules/user/domain/user";
import { Payment } from "../../../../../src/modules/payment/domain/payment";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";

const stripe = new Stripe("123456")
const paymentRepo = new PaymentRepoMongo();
const provider = new StripeProvider(stripe)

// Mock implementation
provider.createPaymentIntent = jest.fn().mockImplementation(async ({payment}: {payment: Payment}) => {
  if (payment.props.amount === 111) {
    return left(CommonUseCaseResult.InvalidValue.create({
      errorMessage: "MOCK",
      variable: "MOCK",
      location: "MOCK"
    }))
  }
  return right({externalId: "123456789", clientSecret: "123"})
}) 

paymentRepo.upsert = jest.fn().mockImplementation(async (payment: Payment) => {
  if (payment.props.amount === 222) {
    return left(CommonUseCaseResult.InvalidValue.create({
      errorMessage: "MOCK",
      variable: "MOCK",
      location: "MOCK"
    }))
  }
  return right(null)
})

const mockStore = {
  id: "123456789",
} as unknown as Store

const createPaymentIntentUseCase = new CreatePaymentIntentUseCase(provider, paymentRepo)
describe("Create payment intent use case", () => {

  it("should create a payment intent", async () => {
    const user = createMockEntityUser()
    const store = mockStore
    const amount = 10

    const result = await createPaymentIntentUseCase.execute({user, store, amount})
    expect(result.isRight()).toBe(true)

    if (result.isLeft()) return;
    expect(result.value.payment.externalId?.toValue()).toBe("123456789")
  })

  it("should return left when user id is invalid", async () => {

    const user = {} as unknown as User

    const result = await createPaymentIntentUseCase.execute({user, store: mockStore, amount: 10})
    expect(result.isLeft()).toBe(true)

  })

  it("should return left when store id is invalid", async () => {

    const store = {} as unknown as Store

    const result = await createPaymentIntentUseCase.execute({user: createMockEntityUser(), store, amount: 10})
    expect(result.isLeft()).toBe(true)

  })

  it("should return left when provider returns left", async () => {
    const result = await createPaymentIntentUseCase.execute({user: createMockEntityUser(), store: mockStore, amount: 111})
    expect(result.isLeft()).toBe(true)
  })

  it("should return left when paymentRepo returns left", async () => {
    const result = await createPaymentIntentUseCase.execute({user: createMockEntityUser(), store: mockStore, amount: 222})
    expect(result.isLeft()).toBe(true)
  })
})
