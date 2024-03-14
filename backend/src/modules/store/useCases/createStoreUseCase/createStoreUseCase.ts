import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IStore } from "../../../../shared/infra/database/models/Store";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { SUPPORTED_PAYMENT_SERVICES } from "../../../payment/services/implementations/payment_services";
import { Store } from "../../domain/store";
import { StoreAdmin } from "../../domain/storeProps/storeAdmin";
import { StoreDestination } from "../../domain/storeProps/storeDestinationId";
import { StoreName } from "../../domain/storeProps/storeName";
import { storeRepo } from "../../repo";
import { CreateStoreDTO } from "./createStoreDTO";



export class CreateStoreUseCase implements UseCase<CreateStoreDTO, Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>>> {

    async execute(store : IStore) : Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>> {
        const adminOrError = StoreAdmin.create({admin : new UniqueGlobalId(store.admin)})
        const nameOrError = StoreName.create({name : store.name})
        const destinationOrError = StoreDestination.create({destinationId: new UniqueGlobalId(store.destinationId)})
        const eitherResult = EitherUtils.combine([adminOrError, nameOrError, destinationOrError])

        if (eitherResult.isLeft()) {
            return left(eitherResult.value)
        }

        const domainStore = Store.create({
            name : nameOrError.getRight(),
            admin : adminOrError.getRight(),
            payment_method : SUPPORTED_PAYMENT_SERVICES.STRIPE,
            destination_id : destinationOrError.getRight()
        })

        if (domainStore.isLeft()) {
            return left(domainStore.value)
        }

        const response = await storeRepo.upsert(domainStore.value)

        if (response.isLeft()) {
            return left(response.value)
        }

        return right(null)


    }

}