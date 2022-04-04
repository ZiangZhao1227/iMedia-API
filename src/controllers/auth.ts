import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ success: false, error: "more information required" });
  }
  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "username or email has been used" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUserDetail = await newUser.save();
    res.status(200).json({
      success: true,
      message: "user has been saved in database",
      userInfo: newUserDetail,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(404)
        .json({ success: false, message: "invalid password" });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      `${process.env.JWT_SEC_KEY}`,
      { expiresIn: "3d" }
    );
    const { password, ...userInfo } = user._doc;
    res.status(200).json({
      success: true,
      message: "login successed",
      userInfo: userInfo,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
