import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    titleProduct: {
      type: String,
      required: true,
    },
    idProduct: {
      type: String,
      required: true,
    },
    priceProduct: {
      type: Number,
      required: true,
    },
    idUser:{
        type:String,
        required: true,
        default:"61b2cecee21e3b210b4450db",
    },
    statusOrder:{
        type: String,
        required: true,
        default:'waiting'
    },
    username: {
        type: String,
        required: true,
        default:"NoName",
    },
    addressUser: {
        type: String,
        required: true,
    },
    numberPhoneUser: {
        type: String,
        required: true,
    },
    numberProduct: {
        type: Number,
        required: true,
    }
  },
  {collection:'orders'},
);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
