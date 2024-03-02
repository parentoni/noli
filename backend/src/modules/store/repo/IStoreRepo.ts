import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { IStore } from "../../../shared/infra/database/models/Store";
import { Store } from "../domain/store";

export interface IStoreRepo {
    upsert(store: Store) : Promise<Either<CommonUseCaseResult.UnexpectedError, null>>,
    exists(id : string) : Promise<Either<CommonUseCaseResult.UnexpectedError, true | false>>
}