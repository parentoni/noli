import { CreatePaymentIntentUseCase } from "./createPaymentIntentUseCase";
import { paymentProvider } from "../../services";
import { paymentRepo } from "../../repo";
import { CreatePaymentIntentController } from "./createPaymentIntentController";
    // Check for payment_intent.succeeded event

const createPaymentIntentUseCase = new CreatePaymentIntentUseCase(paymentProvider, paymentRepo)
const testCreatePaymentIntentController = new CreatePaymentIntentController(createPaymentIntentUseCase)

export { createPaymentIntentUseCase, testCreatePaymentIntentController }
