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
const errorHandlers = require('./middlewares/errorHandlingMiddleware')

dotenv.config();
const app = express();
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


app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/conversations', conversationRouter)
app.use('/api/messages', messageRouter)


app.use(errorHandlers.notFound)
app.use(errorHandlers.errorHandler)

app.listen(8800, () => {
  console.log('Server is Running on port 8800!');
});
