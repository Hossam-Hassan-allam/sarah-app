import { User } from "../DB/models/user.model.js";
import { verifyToken } from "../utiles/createtoken.js";

export const checkuser=async (req,res,next)=>{
const token=req.headers.authorization
if(!token){
  throw new Error("no token found",{cause:401})
}
let pyalod
try {
   pyalod=verifyToken(token)
} catch (error) {
  return next(error)
}
const {id}=pyalod
const user=await User.findById(id)
if(!user){
  throw new Error("user not found",{cause:404})
}

req.UserData=user
next() 
}