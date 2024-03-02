import mongoose from "mongoose"

export interface IItem {
    _id: string,
    name : string,
    description : string,
    image : string,
    price : number,
    storeId : string
}

const ItemSchema = new mongoose.Schema({
    name : {type : String, required: true},
    description : {type : String, required: true},
    image : { type : String, required: false },
    price : { type : Number, required : true},
    storeId : {type :  mongoose.Types.ObjectId, required : true}
})

const ItemModel = mongoose.model<IItem>("Item", ItemSchema);

export {ItemModel}
