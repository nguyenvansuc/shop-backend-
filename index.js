import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import mongoose from 'mongoose';
mongoose
  .connect('mongodb://localhost/Shop')
  .then(() => {
    console.log('connect to DB');
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
const PORT = process.env.port || 5050;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));
app.use(cors());

app.get('/', (req, res) => {
  res.json('success');
});

// app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order',orderRouter);

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
