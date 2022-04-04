import express from "express";

import { updateUser, deleteUser, getUser } from "../controllers/users";
import tokenHandler from "../middlewares/jwtToken";

const router = express.Router();

router.put("/:id", tokenHandler, updateUser);

router.delete("/:id", tokenHandler, deleteUser);

router.get("/:id", getUser);

export default router;
