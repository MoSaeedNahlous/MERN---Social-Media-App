const router = require('express').Router();
const Conversation = require('../models/Conversation')
const { protect } = require('../middlewares/authMiddleware')
const asyncHandler = require('express-async-handler');
const { createConversation, getConversation } = require('../controllers/conversationsRoutes');

//new conversation
router.post("/",protect,asyncHandler(createConversation))

//get conversation
router.get('/',protect,asyncHandler(getConversation))

module.exports = router
