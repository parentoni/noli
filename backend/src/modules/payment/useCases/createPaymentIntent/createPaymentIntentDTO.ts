import { Store } from "../../../store/domain/store"
import { User } from "../../../user/domain/user"

/**
 * Data transfer object for creating a payment intent. 
 */

export type CreatePaymentIntentDTO = {
  amount: number
  user: User
  store: Store 
}
