import Stripe from "stripe";
import { PaymentRepoMongo } from "../../../../../src/modules/payment/repo/implementations/PaymentRepoMongo";
import { StripePaymentIntentSucceededUseCase } from "../../../../../src/modules/payment/useCases/stripeWebhook/stripePaymentIntentSucceededUseCase";
import { right } from "../../../../../src/shared/core/result";
import { createMockDomainPayment } from "../mappers/paymentMapper.spec";

const mockedPaymentRepo = new PaymentRepoMongo()
mockedPaymentRepo.findPaymentByExternalId = jest.fn().mockImplementation(async (externalId: string) => {
  if (externalId === "invalid") {
    return right(null)
  }

  return right(createMockDomainPayment())
})

mockedPaymentRepo.upsert= jest.fn().mockImplementation(async (payment) => {
  return right(null)
})

describe("Stripe payment intent succeeded use case", () => {
    it("should return left when payment is not found", async () => {
      const useCase = new StripePaymentIntentSucceededUseCase(mockedPaymentRepo)
      const result = await useCase.execute({paymentIntent: {id: "invalid"} as Stripe.PaymentIntent})
      expect(result.isLeft()).toBe(true)
    })
  
    it("should return right when payment is found", async () => {
      const useCase = new StripePaymentIntentSucceededUseCase(mockedPaymentRepo)
      const result = await useCase.execute({paymentIntent: {id: "65e50e7b6c10c6ddf83b9ad4"} as Stripe.PaymentIntent})
      expect(result.isRight()).toBe(true)
    })
    
})

