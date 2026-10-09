import multer, { diskStorage } from "multer";
export function uploadprofile(){
    const storage=diskStorage({
        destination:"uploads",
        filename:(req,file,cb)=>{
            if (!file.mimetype.startsWith("image/")) {
                return cb(new Error("Not an image"));
            }
        cb(null,Date.now()+"--"+file.originalname)
        }
    })
    return multer({storage})
}
uploadprofile()

