import express, { Router } from "express";
import { middleware } from "../../../../shared/infra/http/utils";
import { testCreatePaymentIntentController } from "../../useCases/createPaymentIntent";
import { stripeWebhookController } from "../../useCases/stripeWebhook";
import bodyParser from "body-parser";

const paymentRouter = Router();

paymentRouter.post("/create-test-payment-intent", bodyParser.json(), middleware.autheticated(), (req, res) => testCreatePaymentIntentController.execute(req, res))

paymentRouter.post("/webhook/stripe", express.raw({ type: 'application/json' }), (req, res) => stripeWebhookController.execute(req, res))

export { paymentRouter }
