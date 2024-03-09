import { Secrets } from "../../../../config/secretsManager";
import { StripeProvider } from "./providers/stripe";
import Stripe from "stripe";

const stripe = new Stripe(Secrets.getSecret("STRIPE_SECRET_KEY"));
const stripeProvider = new StripeProvider(stripe);

export { stripeProvider };
