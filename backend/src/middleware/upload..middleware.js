import multer from "multer"
import fs from "fs";

const storage = multer.diskStorage({
  
  destination:(req, file, cb) => {
    cb(null, "uploads/")

  },

  filename:(req, file, cb) => {

    cb(
      null,
      Date.now() + "-" + file.originalname
    )

  }

})

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads", { recursive: true });
}

export const upload = multer({
  storage
})