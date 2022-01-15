const router = require('express').Router();
const { addMessage, getMessages } = require('../controllers/messageControllers');
const asyncHandler = require('express-async-handler')
const {protect} = require('../middlewares/authMiddleware')

//add
router.post('/',protect,asyncHandler(addMessage) )

//get
router.get('/:conversationId',protect,asyncHandler(getMessages)) 



module.exports = router
