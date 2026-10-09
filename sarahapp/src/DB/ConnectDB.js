import mongoose from "mongoose";

export default function connectDB(){
mongoose.connect('mongodb://127.0.0.1:27017/SarhaApp').then(()=>{
    console.log("Db connection success")
}).catch((err)=>{
console.error("falied to connection DB",err)
});
}