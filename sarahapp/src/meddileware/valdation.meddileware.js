import Joi from "joi";
export const validation =(schame)=>{
    return (req,res,next)=>{
    const {error}=schame.validate(req.body,{abortEarly: false})
    if(error){
    return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.details.map((err) => err.message)
            });
    }
    next();
    }
}