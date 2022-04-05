import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  toggleLikePost,
  getPost,
  getTimeLinePost,
} from "../controllers/post";
import tokenHandler from "../middlewares/jwtToken";

const router = express.Router();

router.post("/", createPost);

router.put("/:id", tokenHandler, updatePost);

router.delete("/:id", tokenHandler, deletePost);

router.put("/:id/like", tokenHandler, toggleLikePost);

router.get("/:id", getPost);

router.get("/timeline/all", tokenHandler, getTimeLinePost);

export default router;
