const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {
  createPost,
  updatePost,
  deletePost,
  likeAndUnlikePost,
  getPost,
  getUserPosts,
  getCurrentUserTimelinePosts,
} = require('../controllers/postControllers');
const { protect } = require('../middlewares/authMiddleware');

//create a post
router.post('/', protect, asyncHandler(createPost));

//update a post
router.put('/:id', protect, asyncHandler(updatePost));

//delete a post
router.delete('/:id', protect, asyncHandler(deletePost));

//like/dislike a post
router.put('/:id/like', protect, asyncHandler(likeAndUnlikePost));

//get user posts
router.get('/profile/:username', protect, asyncHandler(getUserPosts));

//get timeline posts
router.get('/timeline', protect, asyncHandler(getCurrentUserTimelinePosts));

//get a post
router.get('/:id', protect, asyncHandler(getPost));

module.exports = router;
