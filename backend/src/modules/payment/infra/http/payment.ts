import { Router } from "express";
import { middleware } from "../../../../shared/infra/http/utils";
import { testCreatePaymentIntentController } from "../../useCases/createPaymentIntent";

const paymentRouter = Router();

paymentRouter.post("/create-test-payment-intent", middleware.autheticated(), (req, res) => testCreatePaymentIntentController.execute(req, res))

export { paymentRouter }
