// #region imports
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import { userRouter } from './routes/userRouter.js'
import { productRouter } from './routes/productRouter.js'
// #endregion imports

const app = express();

app.use(morgan('dev'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to mongoose');
  })
  .catch((e) => {
    console.log(e);
  });


// #region hello from server
app.get('/', (req, res) => {
  res.send('Helliiooouuuu');
});
// #endregion hello from server

// #region Routers
app.use('/', userRouter);
app.use('/products', productRouter)

// #endregion Routers

// #region app listener
app.listen(port, () => { console.log('Server online. Port: ', port); });
// #endregion app listener
