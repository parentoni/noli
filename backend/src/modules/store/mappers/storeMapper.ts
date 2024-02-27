import { IStore } from "../../../shared/infra/database/models/Store";
import { Store } from "../domain/store";

export class StoreMapper  {
    public static toPersistent(store : Store) : IStore {
        return {
            admin : store.props.admin.value.toValue(),
            payment_method : store.props.payment_method,
            _id : store.id.toValue(),
            name : store.props.name.value
        }
    }
}