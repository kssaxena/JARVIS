import multer from "multer";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("from Multer", file);
    cb(null, "./public/temp/userImage");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
