import { Router } from "express";
import { changepassword, deleteuser, updateuser, uploadimages, uploedtocloud } from "./user.service.js";
import { validation } from "../../meddileware/valdation.meddileware.js";
import { uploadprofile } from "../../meddileware/uploadimages.js";
import { checkuser } from "../../meddileware/auth.meddleware.js";
import { upload } from "../../meddileware/uploadimage_cloud.js";
import { updatepassword, updateuuser } from "./valdation.user.js";

const router=Router()
router.delete('/deleteuser',checkuser,deleteuser)
router.post('/uploadimage',checkuser,uploadprofile().single("image"),uploadimages)
router.post('/uplodtocloud',checkuser,upload.single("image"),uploedtocloud)
router.patch('/updateuser',checkuser,validation(updateuuser),upload.single("image"),updateuser);
router.patch('/changepass',checkuser,validation(updatepassword),changepassword);

export default router