import { IStore } from "../../../shared/infra/database/models/Store";
import { Store } from "../domain/store";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Left, left, Either, right } from "../../../shared/core/result";
import { StoreName } from "../domain/storeProps/storeName";
import { StoreAdmin } from "../domain/storeProps/storeAdmin";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { SUPPORTED_PAYMENT_SERVICES } from "../../payment/services/implementations/payment_services";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
export class StoreMapper  {

    public static toPersistent(store : Store) : Either<CommonUseCaseResult.UnexpectedError, IStore> {
        try {

        return right( {
            admin : store.props.admin.value.toValue(),
            payment_method : store.props.payment_method,
            _id : store.id.toValue(),
            name : store.props.name.value
        })
    }catch (err) {
        return left(CommonUseCaseResult.UnexpectedError.create(err))
    }
    }

    public static toDomain(store : IStore) : Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Store> {
        try {

        
        // Create properties
        const nameOrError = StoreName.create({name : store.name})
        const adminOrError = StoreAdmin.create({admin : new UniqueGlobalId(store.admin)})

        // Checks if all values are valid
        const combineResponse = EitherUtils.combine([nameOrError, adminOrError])

        if (combineResponse.isLeft()) {
            return left(combineResponse.value)
        }
        // Creates domain store
        const storeDomain = Store.create({
            name : nameOrError.getRight(),
            admin : adminOrError.getRight(),
            payment_method : SUPPORTED_PAYMENT_SERVICES.STRIPE,
        }, new UniqueGlobalId(store._id))
        
        // Checks for error when creating domain store
        if (storeDomain.isLeft()) {
            return left(storeDomain.value)
        }

        return right(storeDomain.value)
    }catch (err) {
        return left(CommonUseCaseResult.UnexpectedError.create(err))
    }
    }
}