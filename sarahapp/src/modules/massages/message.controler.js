import { Router } from "express";
import { deleteAllMessages, deleteMessage, getMyMessages, sendMessage } from "./message.service.js";
import { checkuser } from "../../meddileware/auth.meddleware.js";
const router=Router();
router.post("/send/:id",sendMessage);//not need check user to sent message 
router.get("/my-messages", checkuser, getMyMessages);
router.delete("/:id", checkuser, deleteMessage);
router.delete("/", checkuser, deleteAllMessages);
export default router;