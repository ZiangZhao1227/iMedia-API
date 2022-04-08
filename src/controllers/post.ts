import { Request, Response } from "express";

import Post from "../models/Post";
import User from "../models/User";

export const createPost = async (req: Request, res: Response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      success: true,
      message: "post has been saved in database",
      postInfo: savedPost,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const updatePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      const updatedpost = await post.updateOne({ $set: req.body });
      res.status(200).json({
        success: true,
        message: "the post has been updated",
        postInfo: updatedpost,
      });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "you can update only your post" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const deletePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      const deletedpost = await post.deleteOne();
      res.status(200).json({
        success: true,
        message: "the post has been deleted...",
      });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "you can delete only your post" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const toggleLikePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json({
        success: true,
        message: "the post has been liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res
        .status(403)
        .json({ success: false, message: "the post has been disliked" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "get a post successed",
      postInfo: post,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getTimeLinePost = async (req: any, res: Response) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const followingUserPosts = await Promise.all(
      currentUser.followings.map((followingUserId: string) => {
        return Post.find({ userId: followingUserId });
      })
    );
    res.status(200).json(userPosts.concat(...followingUserPosts));
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
