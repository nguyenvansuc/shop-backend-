import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import mongoose from 'mongoose';

// Connect the database
const connectDB = async () => {
  try {
    await mongoose.connect(
      // `mongodb+srv://dulich:dulich@cluster0.phz2s.gcp.mongodb.net/dulich?retryWrites=true&w=majority`,
      `mongodb+srv://shop-online:<password>@cluster0.98vlq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
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
