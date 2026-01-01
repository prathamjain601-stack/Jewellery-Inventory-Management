import mongoose from 'mongoose';

const categoryEnum = [
  'bangles',
  'earrings',
  'necklace',
  'ring',
  'chain',
  'pendant',
  'bracelet',
  'other'
];

const inventoryEnum = ['Juna Sona', 'Naya Sona', 'On Order'];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: {
      type: Number,
      min: 0,
      required: function () {
        return this.inventoryType === 'Juna Sona';
      }
    },
    imageURL: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: categoryEnum },
    inventoryType: { type: String, required: true, enum: inventoryEnum },
    contactPhone: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
