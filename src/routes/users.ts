import express from "express";

import {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFriends,
} from "../controllers/users";
import tokenHandler from "../middlewares/jwtToken";

const router = express.Router();

router.put("/:id", tokenHandler, updateUser);

router.delete("/:id", tokenHandler, deleteUser);

router.get("/", getUser);

router.put("/:id/follow", tokenHandler, followUser);

router.put("/:id/unfollow", tokenHandler, unfollowUser);

router.get("/friends/:userId", getFriends);

export default router;
