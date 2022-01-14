const User = require('../models/User');
var bcrypt = require('bcryptjs');

const updateUser = async (req, res) => {
  if (req.body.userId === req.user._id.toString()) {
    if (req.body.isAdmin || req.body.followers || req.body.followings) {
      res.status(403);
      throw new Error('DENIED!');
    }
    if (req.body.password) {
      var salt = await bcrypt.genSalt(15);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.email) {
      const validEmail = await User.findOne({ email: req.body.email });
      if (validEmail) {
        res.status(500);
        throw new Error('Entered email is already taken!');
      }
    }
    if (req.body.username) {
      const validUsername = await User.findOne({ username: req.body.username });
      if (validUsername) {
        res.status(500);
        throw new Error('Entered username is already taken!');
      }
    }
    const user = await User.findByIdAndUpdate(req.user._id, {
      $set: req.body,
    });
    res.status(200).json({ success: 'Updated Successfully!', payload: user });
  } else {
    res.status(403).json('You can only update your account!');
  }
};

const deleteUser = async (req, res) => {
  if (req.body.userId === req.user._id.toString()) {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json('Deleted Successfully!');
  } else {
    res.status(403).json('You can only delete your account!');
  }
};

const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  const user = userId
    ? await User.findById(userId).catch((_) => {
        res.status(500);
        throw new Error('Wrong user Id!');
      })
    : await User.findOne({ username: username });
  if (!user) {
    res.status(404);
    throw new Error('No user to be found!');
  } else {
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  }
};

const getUserFriends = async (req, res) => {
  const user = await User.findById(req.params.id).catch((_) => {
    res.status(500);
    throw new Error('Wrong user Id!');
  });
  if (!user) {
    res.status(404);
    throw new Error('No user to be found!');
  }
  const friends = await Promise.all(
    user.followings.map((friendId) => {
      return User.findById(friendId);
    })
  );
  let friendList = [];
  friends.map((friend) => {
    const { _id, username, profilePic } = friend;
    friendList.push({ _id, username, profilePic });
  });
  res.status(200).json(friendList);
};

const followUser = async (req, res) => {
  if (req.user._id !== req.params.id) {
    const user = await User.findById(req.params.id).catch((_) => {
      res.status(500);
      throw new Error('Wrong user Id!');
    });
    if (!user) {
      res.status(404);
      throw new Error('No user to be found!');
    }

    const currentUser = await User.findById(req.user._id);

    if (!user.followers.includes(req.user._id)) {
      await user.updateOne({ $push: { followers: req.user._id } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json('User has been followed!');
    } else {
      res.status(403).json('You already following this user!');
    }
  } else {
    res.status(403).json("You can't follow yourself!");
  }
};

const unfollowUser = async (req, res) => {
  if (req.user._id !== req.params.id) {
   const user = await User.findById(req.params.id).catch((_) => {
      res.status(500);
      throw new Error('Wrong user Id!');
    });
    if (!user) {
      res.status(404);
      throw new Error('No user to be found!');
    }
    const currentUser = await User.findById(req.user._id);

    if (user.followers.includes(req.user._id)) {
      await user.updateOne({ $pull: { followers: req.user._id } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json('User has been unfollowed!');
    } else {
      res.status(403).json('You already not following this user!');
    }
  } else {
    res.status(403).json("You can't unfollow yourself!");
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUserFriends,
  followUser,
  unfollowUser
};
