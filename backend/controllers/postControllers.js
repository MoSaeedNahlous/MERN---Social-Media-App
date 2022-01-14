const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
  if (!req.body.desc) {
    res.status(500);
    throw new Error('You need to enter some text!');
  }
  const newPost = new Post({ ...req.body, userId: req.user._id });
  const savedPost = await newPost.save();
  if (savedPost) {
    res.status(200).json(savedPost);
  } else {
    res.status(500).json('Something went wrong, no for real XD');
  }
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id).catch((_) => {
    res.status(500);
    throw new Error('Wrong post Id!');
  });
  if (!post) {
    res.status(404);
    throw new Error('No post to be found!');
  }
  if (post.userId === req.user._id.toString()) {
    await post.updateOne({ $set: req.body });
    res.status(200).json('Updated Successfully!');
  } else {
    res.status(403).json('You can update only your posts!');
  }
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id).catch((_) => {
    res.status(500);
    throw new Error('Wrong post Id!');
  });
  if (!post) {
    res.status(404);
    throw new Error('No post to be found!');
  }
  if (post.userId === req.user._id.toString()) {
    await post.deleteOne();
    res.status(200).json('deleted Successfully!');
  } else {
    res.status(403).json('You can delete only your posts!');
  }
};

const likeAndUnlikePost = async (req, res) => {
  const post = await Post.findById(req.params.id).catch((_) => {
    res.status(500);
    throw new Error('Wrong post Id!');
  });
  if (!post) {
    res.status(404);
    throw new Error('No post to be found!');
  }
  if (!post.likes.includes(req.user._id.toString())) {
    await post.updateOne({ $push: { likes: req.user._id } });
    res.status(200).json('Post liked!');
  } else {
    await post.updateOne({ $pull: { likes: req.user._id } });
    res.status(200).json('Post disliked!');
  }
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).catch((_) => {
    res.status(500);
    throw new Error('Wrong post Id!');
  });
  if (!post) {
    res.status(404);
    throw new Error('No post to be found!');
  }
  res.status(200).json(post);
};

const getUserPosts = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    res.status(404);
    throw new Error('No user to be found!');
  }
  const posts = await Post.find({ userId: user._id });
  res.status(200).json(posts);
};

const getCurrentUserTimelinePosts = async (req, res) => {
  const curretUser = await User.findById(req.user._id);
  const userPosts = await Post.find({ userId: req.user._id });
  const friendsPosts = await Promise.all(
    curretUser.followings.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.status(200).json(userPosts.concat(...friendsPosts));
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likeAndUnlikePost,
  getPost,
  getUserPosts,
  getCurrentUserTimelinePosts,
};
