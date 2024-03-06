import Stripe from "stripe"
import { StripeProvider } from '../../../../../../src/modules/payment/services/implementations/providers/stripe'
import { createMockDomainPayment } from "../../mappers/paymentMapper.spec"
import { CommonUseCaseResult } from "../../../../../../src/shared/core/response/useCaseError"

const stripe = new Stripe("123456")
const stripeError = new Stripe("123456")
stripe.paymentIntents.create = jest.fn().mockImplementation(async () => {
  return;
})


stripeError.paymentIntents.create = jest.fn().mockImplementation(async () => {
  throw Error("")
})


describe("Stripe provider", () => {

  it("should return a common use case result on error", async () => {
    const provider = new StripeProvider(stripeError)
    const payment = createMockDomainPayment()

    const result = await provider.createPaymentIntent({payment: payment, config: {connectedAccountId: ''}})
    expect(result.value).toBeInstanceOf(CommonUseCaseResult.UnexpectedError)
  })

  it("should return null on success", async () => {
    const provider = new StripeProvider(stripe)
    const payment = createMockDomainPayment()

    const result = await provider.createPaymentIntent({payment: payment, config: {connectedAccountId: ''}})
    expect(result.isRight()).toBe(true)
    expect(result.value).toBeNull()
  })
})
