import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Payment } from "../payment";

/**
 * 
 * @class PaymentPayed
 * @classdesc Event after payment is payed.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class PaymentPayed implements IDomainEvent{
  dateTimeOccurred: Date;
  payment: Payment;

  constructor(payment: Payment) {
    this.dateTimeOccurred = new Date();
    this.payment = payment;
  }

  getAggregateId(): UniqueGlobalId {
    return this.payment.id;
  }

}
