import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subcategory from '../models/subcategory.model.js';

dotenv.config();

const subcategoriesData = [
  // Clothing
  { name: 'Sarees', category: 'clothing', image: { url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80', publicId: 'sample_sarees' }, slug: 'sarees' },
  { name: 'Kurtas', category: 'clothing', image: { url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80', publicId: 'sample_kurtas' }, slug: 'kurtas' },
  { name: 'Lehengas', category: 'clothing', image: { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80', publicId: 'sample_lehengas' }, slug: 'lehengas' },
  { name: 'Fabrics', category: 'clothing', image: { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', publicId: 'sample_fabrics' }, slug: 'fabrics' },
  
  // Home
  { name: 'Pottery', category: 'home', image: { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', publicId: 'sample_pottery' }, slug: 'pottery' },
  { name: 'Textiles', category: 'home', image: { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', publicId: 'sample_textiles' }, slug: 'textiles' },
  { name: 'Kitchenware', category: 'home', image: { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', publicId: 'sample_kitchenware' }, slug: 'kitchenware' },
  { name: 'Furniture', category: 'home', image: { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', publicId: 'sample_furniture' }, slug: 'furniture' },
  
  // Wellness
  { name: 'Ayurveda', category: 'wellness', image: { url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80', publicId: 'sample_ayurveda' }, slug: 'ayurveda' },
  { name: 'Yoga', category: 'wellness', image: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', publicId: 'sample_yoga' }, slug: 'yoga' },
  { name: 'Meditation', category: 'wellness', image: { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80', publicId: 'sample_meditation' }, slug: 'meditation' },
  
  // Beauty
  { name: 'Skincare', category: 'beauty', image: { url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80', publicId: 'sample_skincare' }, slug: 'skincare' },
  { name: 'Haircare', category: 'beauty', image: { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', publicId: 'sample_haircare' }, slug: 'haircare' },
  { name: 'Natural Cosmetics', category: 'beauty', image: { url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80', publicId: 'sample_cosmetics' }, slug: 'natural-cosmetics' },
  
  // Accessories
  { name: 'Jewelry', category: 'accessories', image: { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80', publicId: 'sample_jewelry' }, slug: 'jewelry' },
  { name: 'Bags', category: 'accessories', image: { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', publicId: 'sample_bags' }, slug: 'bags' },
  { name: 'Footwear', category: 'accessories', image: { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80', publicId: 'sample_footwear' }, slug: 'footwear' },
];

const seedSubcategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing subcategories
    await Subcategory.deleteMany({});
    console.log('Cleared existing subcategories');

    // Insert new subcategories
    await Subcategory.insertMany(subcategoriesData);
    console.log('Subcategories seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding subcategories:', error);
    process.exit(1);
  }
};

seedSubcategories();