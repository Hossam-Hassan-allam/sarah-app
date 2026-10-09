import express from "express"
import "dotenv/config"
import Applcation from "./app.controler.js";
const app=express();
Applcation(app,express);
app.listen(3000,()=>{
    console.log("App run success in port 3000")
})
