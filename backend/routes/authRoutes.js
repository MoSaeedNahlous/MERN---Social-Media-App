const router = require('express').Router();
const { register, login, getCurrentUesr } = require('../controllers/authControllers');
const { protect } = require('../middlewares/authMiddleware');
const asyncHandler  = require('express-async-handler')

//Register
router.post('/register',asyncHandler(register))

//Login
router.post('/login',asyncHandler(login))

//Load user
router.get('/load',protect,asyncHandler(getCurrentUesr))


module.exports = router