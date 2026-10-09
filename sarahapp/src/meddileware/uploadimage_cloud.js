import multer from "multer";

const storage = multer.memoryStorage();//لا تحفظ فى السسرفير تحرفع مباشره على cloudinery تخن على ال ram 

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  },
});
