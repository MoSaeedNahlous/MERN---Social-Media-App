const router = require('express').Router();
const { protect } = require('../middlewares/authMiddleware')
const asyncHandler = require('express-async-handler');
const { createConversation, getConversation } = require('../controllers/conversationsControllers');

//new conversation
router.post("/",protect,asyncHandler(createConversation))

//get conversation
router.get('/',protect,asyncHandler(getConversation))

module.exports = router
