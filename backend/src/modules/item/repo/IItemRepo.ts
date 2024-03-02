import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { IItem } from "../../../shared/infra/database/models/Item";
import { Item } from "../domain/item";

export interface IItemRepo {
    upsert(item : Item) : Promise<Either<CommonUseCaseResult.UnexpectedError, null>>,
    findByStore(id : UniqueGlobalId) : Promise<Either<CommonUseCaseResult.UnexpectedError, IItem[]>>,
    findById(id : UniqueGlobalId) : Promise<Either<CommonUseCaseResult.UnexpectedError, Item | null>>
}