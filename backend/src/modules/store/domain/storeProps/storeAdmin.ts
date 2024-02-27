import mongoose from "mongoose";
import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { ValueObject } from "../../../../shared/domain/ValueObject";

/**
 * 
 * @class StoreAdmin
 * @classdesc Store admin value object. Should handle all validation logic. 
 *
 * @author Henrique Cassimiro Kitayama <henrique.kitayama2007@gmail.com>
 */

export interface StoreAdminProps {
    admin : UniqueGlobalId
}

export class StoreAdmin extends ValueObject<StoreAdminProps> {
    get value() : UniqueGlobalId {
        return this.props.admin
    }

    public static create(props : StoreAdminProps) : Either<CommonUseCaseResult.InvalidValue, StoreAdmin> {
        // Check for empty value
        const GuardResponse = Guard.againstNullOrUndefined(props.admin, "STORE_ADMIN")

        if (GuardResponse.isLeft()) {
            return left(GuardResponse.value)
        }

        return right(new StoreAdmin(props))

    }
}