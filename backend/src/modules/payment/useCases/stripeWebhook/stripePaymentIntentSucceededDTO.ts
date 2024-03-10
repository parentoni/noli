import Stripe from "stripe";

/**
 * DTO for the Stripe payment intent succeeded event.
 */
export type StripePaymentIntentSuccededDTO = {
  object: Stripe.PaymentIntent
}
