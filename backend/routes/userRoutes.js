const router = require('express').Router();
const { protect } = require('../middlewares/authMiddleware')
const { updateUser, deleteUser, getUser, getUserFriends, followUser, unfollowUser} = require('../controllers/userControllers')
const asyncHandler = require('express-async-handler')
//Update User
router.put('/',protect,asyncHandler(updateUser));

//Delete a User
router.delete('/', protect, asyncHandler(deleteUser));

//Get a User
router.get('/',protect,asyncHandler(getUser));

//get friends list
router.get('/:id/friends',protect,asyncHandler(getUserFriends));

//follow a user
router.put('/:id/follow', protect,asyncHandler(followUser));

//unfollow a user
router.put('/:id/unfollow',protect,asyncHandler(unfollowUser));

module.exports = router;
