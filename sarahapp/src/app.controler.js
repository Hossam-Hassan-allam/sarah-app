import connectDB from "./DB/ConnectDB.js"
import authrouter from "./modules/auth/auth.controler.js"
import userrouter from "./modules/users/user.control.js"
import messagerouter from "./modules/massages/message.controler.js"
export default function Applcation(app,express){
    app.use(express.json())
    app.use("/auth",authrouter)
    app.use("/users",userrouter)
    app.use('/message',messagerouter)
    app.use("/uploads", express.static("uploads"));
    //glopal Error handeler 
    app.use((err,req,res,next)=>{        
       return res.status(err.cause || 500).json({
        message: err.message || "Internal Server Error",
        success: false,
        globalerrorhandeler:true
    });
    })
    connectDB()
}