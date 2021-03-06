import { Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/User";

export const updateUser = async (req: any, res: Response) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json({ success: false, message: error });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "the account has been updated",
        userInfo: user,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "you can update only your account" });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "user has been deleted...",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "you can delete only your account" });
  }
};

export const getUser = async (req: any, res: Response) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, ...userInfo } = user._doc;
    res.status(200).json({
      success: true,
      message: "get a user successed",
      userInfo: userInfo,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const followUser = async (req: any, res: Response) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res
          .status(200)
          .json({ success: true, message: "user has been followed" });
      } else {
        res
          .status(403)
          .json({ success: false, message: "you already followed this user" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "you can not follow yourself" });
  }
};

export const unfollowUser = async (req: any, res: Response) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
      if (user.followers.includes(req.user.id)) {
        await user.updateOne({ $pull: { followers: req.user.id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res
          .status(200)
          .json({ success: true, message: "user has been unfollowed..." });
      } else {
        res.status(403).json({
          success: false,
          message: "you are not following this user yet",
        });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "you can not follow yourself" });
  }
};

export const getFriends = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId: string) => {
        return User.findById(friendId);
      })
    );
    let friendList: any = [];
    friends.map((friend: any) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json({
      success: true,
      message: "get all friends successed",
      friendList: friendList,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
