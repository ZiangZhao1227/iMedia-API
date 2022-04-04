import express from "express";

import { updateUser } from "../controllers/users";
import tokenHandler from "../middlewares/jwtToken";

const router = express.Router();

router.put("/:id", tokenHandler, updateUser);

export default router;
