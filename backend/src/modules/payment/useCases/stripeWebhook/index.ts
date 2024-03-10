import { paymentRepo } from "../../repo";
import { StripePaymentIntentSucceededUseCase } from "./stripePaymentIntentSucceededUseCase";
import { StripeWebhookController } from "./stripeWebhookController";

const stripePaymentIntentSucceededUseCase = new StripePaymentIntentSucceededUseCase(paymentRepo);
const stripeWebhookController = new StripeWebhookController(stripePaymentIntentSucceededUseCase); 

export { stripeWebhookController };
