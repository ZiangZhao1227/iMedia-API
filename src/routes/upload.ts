import express from "express";
import multer from "multer";

import { uploadFile } from "../controllers/upload";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("file") as any, uploadFile);

export default router;
