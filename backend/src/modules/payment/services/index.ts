import { stripeProvider } from "./implementations";

// allow for easy swapping of payment providers.
const paymentProvider = stripeProvider;

export { paymentProvider };
