const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const multer = require('multer');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const conversationRouter = require('./routes/conversationRoutes');
const messageRouter = require('./routes/messageRoutes');
const path = require('path');
const errorHandlers = require('./middlewares/errorHandlingMiddleware');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const asyncHandler = require('express-async-handler');
const User = require('./models/User');
require('./routes/googleAuthRoutes');

dotenv.config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(
  session({ secret: 'cats', cookie: { maxAge: 99999999999999 }, rolling: true })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
  console.log('MongoDB Connected!');
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

//image uploading handler
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json('File uploaded successfully!');
  } catch (error) {
    console.log(error);
  }
});

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/api/auth/google/success',
  asyncHandler(async (req, res) => {
    console.log('start');
    const userExsist = await User.findOne({ email: req.user.email });
    console.log('check');
    if (userExsist) {
      console.log('exsist');
      res.redirect('http://localhost:3000/login');
    } else {
      res.redirect(`http://localhost:3000/register/continue?username=${req.user.displayName}&email=${req.user.email}&profilePic=${req.user.picture}`);
    }
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8800/api/auth/google/success',
    failureRedirect: 'http://localhost:3000/login',
  })
);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messages', messageRouter);

app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler);

app.listen(8800, () => {
  console.log('Server is Running on port 8800!');
});
