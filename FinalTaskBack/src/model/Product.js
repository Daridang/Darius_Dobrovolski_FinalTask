import mongoose from 'mongoose'
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imgUrl: {
    type: String
  },
  price: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Products', ProductSchema);
