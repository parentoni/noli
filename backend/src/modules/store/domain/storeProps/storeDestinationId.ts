import mongoose from "mongoose";
import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { GlobalIdUtils } from "../../../../shared/utils/GlobalIdUtils";
import { TextUtils } from "../../../../shared/utils/TextUtils";
/**
 * 
 * @class StoreAdmin
 * @classdesc Store destination value object. Should handle all validation logic. 
 *
 * @author Henrique Cassimiro Kitayama <henrique.kitayama2007@gmail.com>
 */

export interface StoreDestinationProps {
    destinationId : UniqueGlobalId
}

export class StoreDestination extends ValueObject<StoreDestinationProps> {
    get value() : UniqueGlobalId {
        return this.props.destinationId
    }

    public static create(props : StoreDestinationProps) : Either<CommonUseCaseResult.InvalidValue, StoreDestination> {
        // Trims admin
        const sanitizedDestination = TextUtils.trim(props.destinationId.toValue())

        // Checks for empty value
        const GuardResponse = Guard.againstNullOrUndefined(sanitizedDestination, "STORE_DESTINATION")
        
        // Returns left if value is empty

        if (GuardResponse.isLeft()) {
            return left(GuardResponse.value)
        }
        // Returns new storename

        return right(new StoreDestination(props))

    }
}