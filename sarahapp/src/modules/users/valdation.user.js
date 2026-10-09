import Joi from "joi"
export const updatepassword=Joi.object({
    oldPassword:Joi.string()
        .min(6)
        .required()
    , newPassword:Joi.string()
        .min(6)
        .required()
})
export const updateuuser=Joi.object({
        name: Joi.string()
            .min(3)
            .max(30),
})