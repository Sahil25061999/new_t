import mongoose from "mongoose";
import { stringify } from "querystring";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"Please provide username"],
    unique:true
  },
  email:{
    type: String,
    required:[true,"Please provide a email"],
    unique:true
  },
  password:{
    type:String,required:[true,"Please provide a password"]
  },
  isVerifed:{
    type:Boolean,
    default: false
  },
  isAdmin:{
    type:Boolean,
    default: false
  },
  forgottenPasswordToken: String,
  forgottenPasswordTokenExpiry: Date,
  verifyToken:String,
  verifyTokenExpiry:Date

})

export const User = mongoose.models.users || mongoose.model("users",userSchema)