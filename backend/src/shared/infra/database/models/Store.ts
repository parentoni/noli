import mongoose from "mongoose";
import { SUPPORTED_PAYMENT_SERVICES } from "../../../../modules/payment/services/implementations/payment_services";

export const StoreSchema = new mongoose.Schema({
    name : {type : String, required : true},
    admin : {type : mongoose.Types.ObjectId, required : true},
    payment_method : {type : Object, required : true},
    destination_id : {type : String, required : true}
})

export interface IStore {
    _id : string,
    admin : string,
    payment_method : SUPPORTED_PAYMENT_SERVICES,
    name : string,
    destinationId : string
}

const StoreModel = mongoose.model<IStore>("Store", StoreSchema);

export {StoreModel}