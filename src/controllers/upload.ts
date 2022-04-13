import { Request, Response } from "express";

export const uploadFile = (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "file uploaded successfully" });
  } catch (error) {
    console.log(error);
  }
};
