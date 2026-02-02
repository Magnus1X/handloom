import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['clothing', 'home', 'wellness', 'beauty', 'accessories']
  },
  subcategory: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['men', 'women', 'kids', 'unisex'],
    required: function() {
      return this.category === 'clothing';
    }
  },
  sizes: [{
    size: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  }],
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  stock: {
    type: Number,
    required: function() {
      return this.category !== 'clothing';
    },
    min: 0
  }
}, {
  timestamps: true
});

productSchema.virtual('imageUrl').get(function() {
  return this.images.length > 0 ? this.images[0].url : '';
});

productSchema.virtual('totalStock').get(function() {
  if (this.category === 'clothing' && this.sizes.length > 0) {
    return this.sizes.reduce((total, size) => total + size.stock, 0);
  }
  return this.stock || 0;
});

productSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Product', productSchema);