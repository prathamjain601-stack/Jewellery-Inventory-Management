import mongoose from 'mongoose';

const categoryEnum = [
  'bangles',
  'earrings',
  'necklace',
  'ring',
  'chain',
  'pendant',
  'bracelet',
  'mixed product',
  'other'
];

const inventoryEnum = ['Juna Sona', 'Naya Sona', 'Order Cancelled Product'];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    amount: { type: Number, min: 0 },
    productWeight: { type: Number, min: 0 },
    goldRateType: {
      type: String,
      enum: ['single', 'range'],
      required: true,
      default: 'single'
    },
    goldRateValue: {
      type: Number,
      min: 0,
      required: function () {
        return this.goldRateType === 'single';
      }
    },
    goldRateMin: {
      type: Number,
      min: 0,
      required: function () {
        return this.goldRateType === 'range';
      }
    },
    goldRateMax: {
      type: Number,
      min: 0,
      required: function () {
        return this.goldRateType === 'range';
      }
    },
    goldRateUpdatedOn: { type: Date, required: true, default: Date.now },
    imageURL: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: categoryEnum },
    inventoryType: { type: String, required: true, enum: inventoryEnum },
    contactPhone: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
