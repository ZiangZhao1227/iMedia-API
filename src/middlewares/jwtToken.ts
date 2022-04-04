import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request | any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token as string;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, `${process.env.JWT_SEC_KEY}`, (err, payload) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, error: "Incorrect or expired token!" });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ success: false, error: "You are not authenticated!" });
  }
};

export default verifyToken;
