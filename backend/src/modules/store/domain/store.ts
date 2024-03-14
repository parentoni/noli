import mongoose from "mongoose";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { SUPPORTED_PAYMENT_SERVICES } from "../../payment/services/implementations/payment_services";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { Either, left, right } from "../../../shared/core/result";
import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Guard } from "../../../shared/core/Guard";
import { StoreName } from "./storeProps/storeName";
import { StoreAdmin } from "./storeProps/storeAdmin";
import { StoreDestination } from "./storeProps/storeDestinationId";

export interface StoreProps {
    admin : StoreAdmin,
    payment_method : SUPPORTED_PAYMENT_SERVICES,
    name : StoreName,
    destination_id : StoreDestination
}

export class Store extends AggregateRoot<StoreProps> {
    get admin() : UniqueGlobalId {
        return this.props.admin.value
    }

    get payment_method() : SUPPORTED_PAYMENT_SERVICES {
        return this.props.payment_method
    }

    get name() : string {
        return this.props.name.value
    }

    get destination_id() : UniqueGlobalId {
        return this.props.destination_id.value
    }

    /**
   * Private constructor forces the use of the create method
   * @param {StoreProps} props 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */

    private constructor(props: StoreProps, id?: UniqueGlobalId | undefined) { 
        super(props, id)
    }

    public static create(props : StoreProps, id? : UniqueGlobalId | undefined) : Either<CommonUseCaseResult.InvalidValue, Store>{
        // Check for empty values
        const GuardResponse = Guard.againstNullOrUndefinedBulk([
            { argument : props.admin, argumentName: "STORE_ADMIN"}, 
            {argument : props.name, argumentName : "STORE_NAME"}, 
            {argument : props.payment_method, argumentName : "STORE_PAYMENT_METHOD"},
            {argument : props.destination_id, argumentName : "STORE_DESTINATION_ID"},
        ])
            if (GuardResponse.isLeft()) {
                return left(GuardResponse.value)
            }
            // return right if all values are valid
            return right(new Store(props, id))
        }

}