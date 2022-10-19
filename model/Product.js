import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Please provide product name'],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: [true, 'Please provide brand'],
    },
    condition: {
      type: String,
      enum: ['brand new', 'new', 'like new', 'used', 'old', 'broken'],
      default: 'new',
    },
    status: {
      type: String,
      enum: ['available', 'sold out', 'ordering'],
      default: 'available',
    },
    shopLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
