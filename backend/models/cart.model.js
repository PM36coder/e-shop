import { Schema ,model } from "mongoose";

const carItemSchema = new Schema({
    product : {type : Schema.Types.ObjectId, ref:"Product" , required:true},
    quantity : {type : Number,min:0 , default:0}
})

const cartSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId , ref:"User", required:true , unique:true
    },
    items : [carItemSchema]
} , {timestamps: true})

export const Cart = model('Cart', cartSchema)