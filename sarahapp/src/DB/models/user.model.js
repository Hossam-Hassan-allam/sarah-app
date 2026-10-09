
import mongoose, { Schema } from "mongoose";

const userSchame=new Schema(
 {
    name: {
      type: String,
      required: true,
      min:[6,"name length should be 6 char"]
    },
    otp:{
     type:String,
     default:null
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate:{
      validator: function (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);},
       message: "Please enter a valid email",
      }
    },

    password: {
      type: String,
    },

    age: {
      type: Number,
    },

    profileImage: {
      type: String,
      default: null,
    },
    isverfiy:{
        type:Boolean,
        default:false,
    },
    otpExpiresAt: {
       type: Date,
       defalut:null
    },
        googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    profileImage:{
      type:String,
      default:null
    },
  
    profileImageId: {
    type:String,
    defalut:null
    }
  }
,{timestamps:true})
export const User=mongoose.model('User',userSchame)
