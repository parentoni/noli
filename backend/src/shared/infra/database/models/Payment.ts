import mongoose from "mongoose";
import { PAYMENT_PROVIDERS } from "../../../../modules/payment/services/IPaymentProviders";

// Mongoose schema for payment
const paymentSchema = new mongoose.Schema({
  externalId: {type: String, required: true},
  user: {type: mongoose.Types.ObjectId, required:true},
  provider: {type: String, enum: PAYMENT_PROVIDERS, required: true},
  amount: {type: Number, required: true},
  payed: {type: Boolean, required: true}
})

// Persisted type for payment
export type IPayment = {
  _id: string;
  externalId: string;
  user: string;
  provider: PAYMENT_PROVIDERS;
  amount: number;
  payed: boolean;
}

const PaymentModel = mongoose.model('Payment', paymentSchema);

export default PaymentModel;
