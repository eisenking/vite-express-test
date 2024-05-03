import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  decorType: String,
  decorPrice: Number,
  description: String,
  cover: [String],
  mainCover: String,
  tiers: Number,
  imgUrl: String,
  imgAlt: String,
  weightOnPhoto: Number,
  categories: [String],
  subCategories: [String],
  mainCategory: String,
  moreInfo: String,
  isNewProduct: Boolean,
  order: Number,
}, 
{
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;