import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    sale: {
        type: Number,
        required: true,
        default:0
    }
  },
  {collection:'products'},
);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
