import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name : {type : String ,  required: true , trim:true},
    email:{type : String , required: true, lowercase:true, trim:true},
    password: {type : String, required:true, minlength:8 , select:false, trim:true},
    role:{
        type : String,
        enum : ['user', 'admin'],
        default:"user"
    },
     address: {
      fullName: { type: String, default: "" },
      phone: { type: String, default: "" },
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pincode: { type: String, default: "" },
      country: { type: String, default: "India" },
    },
},{timestamps:true})


export const User = model('User', userSchema)