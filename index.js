import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Connect the database
const connectDB = async () => {
  try {
    await mongoose.connect(
      // `mongodb+srv://dulich:dulich@cluster0.phz2s.gcp.mongodb.net/dulich?retryWrites=true&w=majority`,
      `mongodb+srv://shop-online:shop-online@cluster0.98vlq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

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
app.get('/', (req, res) => {
  res.json('success');
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

const test=async()=>{
  const check=await bcrypt.hash('111', 12);
console.log(check,'test');
const result = await bcrypt.compare('111', check);
console.log(result)
}
test()