import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { IStore } from "../../../shared/infra/database/models/Store";
import { Store } from "../domain/store";

export interface IStoreRepo {
    upsert(store: Store) : Promise<Either<CommonUseCaseResult.UnexpectedError, null>>,
    exists(id : UniqueGlobalId) : Promise<Either<CommonUseCaseResult.UnexpectedError, true | false>>,
    findById(id : UniqueGlobalId) : Promise<Either<CommonUseCaseResult.UnexpectedError, Store | null>> ,
    getAll() : Promise<Either<CommonUseCaseResult.UnexpectedError, Store[]>>
}