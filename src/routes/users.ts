import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is user route");
});

export default router;
