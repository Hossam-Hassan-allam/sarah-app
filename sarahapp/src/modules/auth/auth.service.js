import { User } from "../../DB/models/user.model.js"
import { createToken } from "../../utiles/createtoken.js"
import { checkPassword, hashPassword } from "../../utiles/hash.js"
import { createOTP } from "../../utiles/otp.js"
import { sendEmail } from "../../utiles/sendemail.js"
//register
export async function register(req,res,next){
    //get data from body
    const {name,password,email}=req.body
    //check user excit or no
    const userexcit=await User.findOne({email})
    if(userexcit){
        throw new Error("user excit with this email",{cause:400})
    }
    //haash password
    const hashpassword=await hashPassword(password);
    //sent&create otp to email to make verfiy
    const otp=createOTP()
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await sendEmail(email,otp)
    //save user 
    await User.create({name,email,otp,password:hashpassword,otpExpiresAt})
    res.status(201).json({message:"sent otp to your email success go to verfiyemail",success:true})
}
//login 
export async function login(req,res,next) {

//check entered data or not
 const {email,password}=req.body
 // check user excit or not 
 const userexcit=await User.findOne({email})
 if(!userexcit){
 throw new Error("user not found",{cause:404});
 }
 //check password
 if(!checkPassword(password,userexcit.password)){
   throw new Error("email or password is wrong");
 }
 if(!userexcit.isverfiy){
  throw new Error("email not verfied yet");
 }
 //crete token
const token= createToken(userexcit.id)
//sent response
res.status(201).json({message:"log in success",success:true,token})
} 

//verfiy email 
export async function verfiyemail(req,res,next) {
const {email,otp}=req.body
if(!otp){
 throw new Error("write otp");
}
const user=await User.findOne({email,otp,otpExpiresAt:{$gt:Date.now()}})
if(!user){
throw new Error("inviled otp");
}
//verfiy email 
const token= createToken(user.id)
await User.updateOne({email},{otp:null,otpExpiresAt:null,isverfiy:true})
res.status(201).json({message:"verfied email success",success:true,token})
}
//resendotp
export async function resendotp(req,res,next) {
//get data

const {email}=req.body
const user=await User.findOne({email})
const otp=createOTP();
const otpExpiresAt=new Date(Date.now()+5*1000*60);
user.otp=otp
user.otpExpiresAt=otpExpiresAt;
await user.save();
await sendEmail(email,otp)
res.status(201).json({message:"we send new otp",success:true})
}
