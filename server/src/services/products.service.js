import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

export const getAllProducts = async (filters = {}) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    let products = JSON.parse(data);

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category) {
      products = products.filter(product => product.category === filters.category);
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'price_low':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          products.reverse();
          break;
      }
    }

    return products;
  } catch (error) {
    throw new Error('Failed to read products data');
  }
};

export const getProductById = async (id) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(data);
    return products.find(product => product.id === id);
  } catch (error) {
    throw new Error('Failed to read products data');
  }
};

export const getCategories = async () => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(data);
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  } catch (error) {
    throw new Error('Failed to read products data');
  }
};