import Subcategory from '../models/subcategory.model.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

export const getSubcategories = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const subcategories = await Subcategory.find(filter);
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    const imageUpload = await uploadImage(req.file.buffer);
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    const subcategory = new Subcategory({
      name,
      category,
      slug,
      image: {
        url: imageUpload.secure_url,
        publicId: imageUpload.public_id
      }
    });
    
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (req.file) {
      const subcategory = await Subcategory.findById(id);
      if (subcategory) {
        await deleteImage(subcategory.image.publicId);
      }
      
      const imageUpload = await uploadImage(req.file.buffer);
      updates.image = {
        url: imageUpload.secure_url,
        publicId: imageUpload.public_id
      };
    }
    
    if (updates.name) {
      updates.slug = updates.name.toLowerCase().replace(/\s+/g, '-');
    }
    
    const subcategory = await Subcategory.findByIdAndUpdate(id, updates, { new: true });
    
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findById(id);
    
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    await deleteImage(subcategory.image.publicId);
    await Subcategory.findByIdAndDelete(id);
    
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};