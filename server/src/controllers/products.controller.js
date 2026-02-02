import Product from '../models/product.model.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';
import { getAllProducts, getProductById, getCategories } from '../services/products.service.js';

export const getProducts = async (req, res) => {
  try {
    const { search, category, subcategory, sort } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    
    const dbProducts = await Product.find(filter)
      .sort(sort === 'price-asc' ? { price: 1 } : sort === 'price-desc' ? { price: -1 } : { createdAt: -1 });
    
    let products = dbProducts;
    
    if (search) {
      products = products.filter(product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price, category, subcategory, description, stock, gender, sizes } = req.body;
    
    console.log('Creating product:', { title, price, category, subcategory, description, stock, gender, sizes });
    console.log('Files received:', req.files?.length);
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least 1 image is required' });
    }
    
    const imageUploads = await Promise.all(
      req.files.map(file => uploadImage(file.buffer))
    );
    
    const images = imageUploads.map(upload => ({
      url: upload.secure_url,
      publicId: upload.public_id
    }));
    
    const productData = {
      title,
      price: Number(price),
      category,
      subcategory,
      description,
      images
    };
    
    if (category === 'clothing') {
      productData.gender = gender;
      productData.sizes = JSON.parse(sizes);
    } else {
      productData.stock = Number(stock);
    }
    
    const product = new Product(productData);
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Product creation error:', error);
    if (req.files) {
      req.files.forEach(async (file, index) => {
        if (req.uploadedImages && req.uploadedImages[index]) {
          await deleteImage(req.uploadedImages[index].public_id);
        }
      });
    }
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    // Parse sizes if it's a string (from FormData)
    if (updates.sizes && typeof updates.sizes === 'string') {
      updates.sizes = JSON.parse(updates.sizes);
    }
    
    // Convert price and stock to numbers
    if (updates.price) updates.price = Number(updates.price);
    if (updates.stock) updates.stock = Number(updates.stock);
    
    if (req.files && req.files.length > 0) {
      const product = await Product.findById(id);
      if (product) {
        await Promise.all(product.images.map(img => deleteImage(img.publicId)));
      }
      
      const imageUploads = await Promise.all(
        req.files.map(file => uploadImage(file.buffer))
      );
      
      updates.images = imageUploads.map(upload => ({
        url: upload.secure_url,
        publicId: upload.public_id
      }));
    }
    
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await Promise.all(product.images.map(img => deleteImage(img.publicId)));
    await Product.findByIdAndDelete(id);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoriesList = async (req, res) => {
  try {
    const categories = ['clothing', 'home', 'accessories'];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};