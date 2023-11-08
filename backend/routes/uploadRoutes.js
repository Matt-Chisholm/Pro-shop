import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // The file name will be the current timestamp in milliseconds plus the original file extension name
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed file types
  const fileTypes = /jpg|jpeg|png/;
  // Check file extension name
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only (jpg, jpeg and png only)!");
  }
}

// Upload configuration
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
