import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";

export type PaymentProps = {
  externalId: UniqueGlobalId;
  value: number;
}
