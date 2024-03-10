import Stripe from "stripe";
import { Secrets } from "../../../../config/secretsManager";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { StripePaymentIntentSucceededUseCase } from "./stripePaymentIntentSucceededUseCase";

/**
 * 
 * @class StripeWebhookController
 * @classdesc Controller for handling stripe webhooks.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class StripeWebhookController extends BaseController<Request> {
  stripePaymentIntentSucceededUseCase: StripePaymentIntentSucceededUseCase;

  /**
   * Injects the stripe payment intent succeeded use case.
   * @param {StripePaymentIntentSucceededUseCase} stripePaymentIntentSucceededUseCase 
   */
  constructor(stripePaymentIntentSucceededUseCase: StripePaymentIntentSucceededUseCase) {
    super();
    this.stripePaymentIntentSucceededUseCase = stripePaymentIntentSucceededUseCase;
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    //Secure the request by verifying the signature

    try {
      const sig = req.headers['stripe-signature'];
      if (!sig) {
        return this.fail(res, "Stripe signature not found");
      }

      // Verify the event by calling the stripe.webhooks.constructEvent method
      // and pass in the raw body and the signature
      const event = Stripe.webhooks.constructEvent(req.body, sig, Secrets.getSecret("STRIPE_WEBHOOK_SECRET"));

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.stripePaymentIntentSucceededUseCase.execute({object: event.data.object});
          break;
        default:
          break; 
      }
    } catch (err: any) {
      return this.fail(res, err.toString());
    }

    return this.ok(res);
  }
}

