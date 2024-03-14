import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IStore } from "../../../../shared/infra/database/models/Store";
import { Store } from "../../domain/store";
import { StoreMapper } from "../../mappers/storeMapper";
import { storeRepo } from "../../repo";

export class GetAllStores implements UseCase<void, Promise<Either<CommonUseCaseResult.UnexpectedError, IStore[]>>> {

    async execute() : Promise<Either<CommonUseCaseResult.UnexpectedError, IStore[]>>{
        const persistentStores : IStore[] = []
        const stores = await storeRepo.getAll()

        if (stores.isLeft()) {
            return left(stores.value)
        }

        for (const store of stores.value) {
            const persistentStore = StoreMapper.toPersistent(store)

            persistentStores.push(persistentStore.getRight())
        }

        return right(persistentStores)
    }
}