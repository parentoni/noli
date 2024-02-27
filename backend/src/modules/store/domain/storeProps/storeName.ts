import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
import { Either, left, right } from "../../../../shared/core/result";
import { ValueObject } from "../../../../shared/domain/ValueObject";

/**
 * 
 * @class StoreName
 * @classdesc Store name value object. Should handle all validation logic. 
 *
 * @author Henrique Cassimiro Kitayama <henrique.kitayama2007@gmail.com>
 */

export interface StoreNameProps {
    name : string
}

export class StoreName extends ValueObject<StoreNameProps> {
    get value() : string {
        return this.props.name
    }

    public static create(props : StoreNameProps) : Either<CommonUseCaseResult.InvalidValue, StoreName> {
        // Check for empty value
        const GuardResponse = Guard.againstNullOrUndefined(props.name.trim(), "STORE_NAME")
        
        // Check for name shorter than 4 letters
        if (GuardResponse.isLeft() || props.name.trim().length <= 4) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `The value sent is not a valid store name: ${props.name}`,
                variable: "STORE_NAME",
                location: `${StoreName.name}.${StoreName.create.name}`
            }))
        }

        return right(new StoreName(props))

    }
}