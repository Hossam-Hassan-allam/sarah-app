import { Router } from "express";
import { login, register, verfiyemail } from "./auth.service.js";
import { googleLogin } from "./google.servise.js";
import { validation } from "../../meddileware/valdation.meddileware.js";
import { loginschame, registerSchema } from "./validation.auth.js";
const router=Router();
router.post("/register",validation(registerSchema),register);
router.post("/auth/google", googleLogin);
router.get("/login",validation(loginschame),login);
router.patch("/verfiyemail",verfiyemail)
export default router