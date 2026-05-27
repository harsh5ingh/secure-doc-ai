import express from "express"
import { 
  signup,
   login,
    getMe,
     uploadPdf,
     getDocuments,
     getDocumentsbyId
     } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/upload..middleware.js"

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.get("/me", authMiddleware, getMe)

router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadPdf
)

router.get(
  "/documents",
  authMiddleware,
  getDocuments,
)

router.get(
  "/documents/:id",
  authMiddleware,
  getDocumentsbyId,
)

export default router