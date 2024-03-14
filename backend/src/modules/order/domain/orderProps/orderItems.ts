// import { Guard } from "../../../../shared/core/Guard";
// import { CommonUseCaseResult } from "../../../../shared/core/response/useCaseError";
// import { Either, left } from "../../../../shared/core/result";
// import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
// import { ValueObject } from "../../../../shared/domain/ValueObject";
// import { Day } from "../../../../shared/infra/database/models/Order";

// export interface OrderItem {
//     _id : UniqueGlobalId, 
//     name : string, 
//     day : Day
// }

// export interface OrderItemsProps {
//     items : OrderItem[]
// }

// export class OrderItems extends ValueObject<OrderItemsProps> {
//     get value() : OrderItemsProps {
//         return this.props
//     }

//     public static create(items : OrderItemsProps) : Either<CommonUseCaseResult.InvalidValue, OrderItems> {


//         for (const item of items.items) {
//             for (let c = 0; c < Object.values(item).length; c++) {

//                 const GuardResponse = Guard.againstNullOrUndefined(Object.values(item)[c], `ORDER_ITEM_${Object.keys(item)[c]}`)

//                 if (GuardResponse.isLeft()) {
//                     return left(GuardResponse.value)
//                 }

//             }
//         }


//     }


// }