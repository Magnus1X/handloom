import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

const products = [
  // Clothing - Sarees (10 products)
  { title: 'Banarasi Silk Saree', price: 8500, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 15}], description: 'Traditional handwoven Banarasi silk saree with gold zari work', rating: 4.8 },
  { title: 'Kanjivaram Silk Saree', price: 12000, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 8}], description: 'Pure silk Kanjivaram saree with temple border design', rating: 4.9 },
  { title: 'Chanderi Cotton Saree', price: 3500, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 25}], description: 'Lightweight Chanderi cotton saree with block print', rating: 4.6 },
  { title: 'Tussar Silk Saree', price: 4500, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 12}], description: 'Natural tussar silk saree with hand-painted motifs', rating: 4.7 },
  { title: 'Bandhani Georgette Saree', price: 2800, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 20}], description: 'Rajasthani bandhani tie-dye georgette saree', rating: 4.5 },
  { title: 'Paithani Silk Saree', price: 15000, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 5}], description: 'Authentic Paithani silk saree with peacock motifs', rating: 4.9 },
  { title: 'Tant Cotton Saree', price: 1800, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 30}], description: 'Bengali tant cotton saree with traditional border', rating: 4.4 },
  { title: 'Maheshwari Silk Saree', price: 3200, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 18}], description: 'Maheshwari silk cotton blend saree with zari border', rating: 4.6 },
  { title: 'Sambalpuri Ikat Saree', price: 4200, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 10}], description: 'Handwoven Sambalpuri ikat saree from Odisha', rating: 4.7 },
  { title: 'Kasavu Cotton Saree', price: 2500, category: 'clothing', subcategory: 'sarees', gender: 'women', sizes: [{size: 'Free Size', stock: 22}], description: 'Kerala kasavu cotton saree with gold border', rating: 4.5 },

  // Clothing - Kurtas (10 products)
  { title: 'Chikankari Cotton Kurta', price: 1800, category: 'clothing', subcategory: 'kurtas', gender: 'women', sizes: [{size: 'S', stock: 8}, {size: 'M', stock: 12}, {size: 'L', stock: 10}, {size: 'XL', stock: 5}], description: 'Lucknowi chikankari embroidered cotton kurta', rating: 4.6 },
  { title: 'Block Print Khadi Kurta', price: 1200, category: 'clothing', subcategory: 'kurtas', gender: 'men', sizes: [{size: 'M', stock: 15}, {size: 'L', stock: 15}, {size: 'XL', stock: 10}], description: 'Hand block printed khadi cotton kurta', rating: 4.4 },
  { title: 'Bandhgala Silk Kurta', price: 3500, category: 'clothing', subcategory: 'kurtas', gender: 'men', sizes: [{size: 'M', stock: 5}, {size: 'L', stock: 6}, {size: 'XL', stock: 4}], description: 'Formal bandhgala silk kurta with collar', rating: 4.7 },
  { title: 'Pathani Suit Set', price: 2200, category: 'clothing', subcategory: 'kurtas', gender: 'men', sizes: [{size: 'M', stock: 8}, {size: 'L', stock: 10}, {size: 'XL', stock: 7}], description: 'Traditional pathani kurta with salwar set', rating: 4.5 },
  { title: 'Nehru Jacket Kurta Set', price: 2800, category: 'clothing', subcategory: 'kurtas', gender: 'men', sizes: [{size: 'M', stock: 7}, {size: 'L', stock: 8}, {size: 'XL', stock: 5}], description: 'Cotton kurta with matching Nehru jacket', rating: 4.6 },
  { title: 'Angrakha Style Kurta', price: 2000, category: 'clothing', subcategory: 'kurtas', gender: 'women', sizes: [{size: 'S', stock: 10}, {size: 'M', stock: 12}, {size: 'L', stock: 8}], description: 'Traditional angrakha style cotton kurta', rating: 4.5 },
  { title: 'Printed Rayon Kurta', price: 950, category: 'clothing', subcategory: 'kurtas', gender: 'unisex', sizes: [{size: 'S', stock: 12}, {size: 'M', stock: 18}, {size: 'L', stock: 15}, {size: 'XL', stock: 5}], description: 'Comfortable rayon kurta with ethnic prints', rating: 4.3 },
  { title: 'Linen Straight Kurta', price: 1600, category: 'clothing', subcategory: 'kurtas', gender: 'women', sizes: [{size: 'S', stock: 8}, {size: 'M', stock: 12}, {size: 'L', stock: 8}], description: 'Pure linen straight cut kurta for summer', rating: 4.4 },
  { title: 'Embroidered Silk Kurta', price: 4200, category: 'clothing', subcategory: 'kurtas', gender: 'women', sizes: [{size: 'S', stock: 3}, {size: 'M', stock: 5}, {size: 'L', stock: 4}], description: 'Heavy embroidered silk kurta for occasions', rating: 4.8 },
  { title: 'Handloom Cotton Kurta', price: 1400, category: 'clothing', subcategory: 'kurtas', gender: 'men', sizes: [{size: 'M', stock: 12}, {size: 'L', stock: 12}, {size: 'XL', stock: 8}], description: 'Handloom cotton kurta with traditional weave', rating: 4.5 },

  // Clothing - Lehengas (8 products)
  { title: 'Bridal Lehenga Choli', price: 25000, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 1}, {size: 'M', stock: 1}, {size: 'L', stock: 1}], description: 'Heavy embroidered bridal lehenga with dupatta', rating: 4.9 },
  { title: 'Rajasthani Mirror Work Lehenga', price: 8500, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 2}, {size: 'M', stock: 3}, {size: 'L', stock: 3}], description: 'Traditional Rajasthani lehenga with mirror work', rating: 4.7 },
  { title: 'Silk Lehenga Set', price: 12000, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 2}, {size: 'M', stock: 2}, {size: 'L', stock: 2}], description: 'Pure silk lehenga choli with zari work', rating: 4.8 },
  { title: 'Cotton Lehenga Skirt', price: 3200, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 5}, {size: 'M', stock: 6}, {size: 'L', stock: 4}], description: 'Casual cotton lehenga skirt with crop top', rating: 4.4 },
  { title: 'Net Lehenga with Sequins', price: 6800, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 3}, {size: 'M', stock: 4}, {size: 'L', stock: 3}], description: 'Party wear net lehenga with sequin work', rating: 4.6 },
  { title: 'Bandhani Lehenga Choli', price: 5500, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 4}, {size: 'M', stock: 4}, {size: 'L', stock: 4}], description: 'Gujarati bandhani lehenga choli set', rating: 4.5 },
  { title: 'Georgette Lehenga Set', price: 4200, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 6}, {size: 'M', stock: 7}, {size: 'L', stock: 5}], description: 'Flowy georgette lehenga with embroidery', rating: 4.4 },
  { title: 'Velvet Lehenga Choli', price: 9500, category: 'clothing', subcategory: 'lehengas', gender: 'women', sizes: [{size: 'S', stock: 2}, {size: 'M', stock: 3}, {size: 'L', stock: 2}], description: 'Rich velvet lehenga choli for winter weddings', rating: 4.7 },

  // Clothing - Fabrics (6 products)
  { title: 'Banarasi Silk Fabric', price: 1200, category: 'clothing', subcategory: 'fabrics', gender: 'unisex', sizes: [{size: '1 Meter', stock: 50}], description: 'Pure Banarasi silk fabric per meter', rating: 4.7 },
  { title: 'Khadi Cotton Fabric', price: 280, category: 'clothing', subcategory: 'fabrics', gender: 'unisex', sizes: [{size: '1 Meter', stock: 100}], description: 'Handspun khadi cotton fabric per meter', rating: 4.5 },
  { title: 'Chanderi Silk Fabric', price: 800, category: 'clothing', subcategory: 'fabrics', gender: 'unisex', sizes: [{size: '1 Meter', stock: 75}], description: 'Chanderi silk cotton blend fabric per meter', rating: 4.6 },
  { title: 'Tussar Silk Fabric', price: 650, category: 'clothing', subcategory: 'fabrics', gender: 'unisex', sizes: [{size: '1 Meter', stock: 60}], description: 'Natural tussar silk fabric per meter', rating: 4.5 },
  { title: 'Handloom Cotton Fabric', price: 320, category: 'clothing', subcategory: 'fabrics', gender: 'unisex', sizes: [{size: '1 Meter', stock: 80}], description: 'Traditional handloom cotton fabric per meter', rating: 4.4 },
  { title: 'Jamdani Muslin Fabric', price: 950, category: 'clothing', subcategory: 'fabrics', gender: 'unisex', sizes: [{size: '1 Meter', stock: 40}], description: 'Fine jamdani muslin fabric per meter', rating: 4.8 },

  // Home - Spices (12 products)
  { title: 'Kashmiri Red Chili Powder', price: 450, category: 'home', subcategory: 'spices', description: 'Premium Kashmiri red chili powder 500g', rating: 4.8, stock: 100 },
  { title: 'Turmeric Powder', price: 180, category: 'home', subcategory: 'spices', description: 'Pure turmeric powder from Erode 500g', rating: 4.7, stock: 150 },
  { title: 'Garam Masala Powder', price: 320, category: 'home', subcategory: 'spices', description: 'Homemade garam masala blend 250g', rating: 4.6, stock: 80 },
  { title: 'Cardamom Green', price: 1200, category: 'home', subcategory: 'spices', description: 'Premium green cardamom from Kerala 100g', rating: 4.9, stock: 50 },
  { title: 'Black Pepper Whole', price: 800, category: 'home', subcategory: 'spices', description: 'Malabar black pepper whole 250g', rating: 4.7, stock: 60 },
  { title: 'Cumin Seeds', price: 280, category: 'home', subcategory: 'spices', description: 'Rajasthani cumin seeds 500g', rating: 4.5, stock: 120 },
  { title: 'Coriander Seeds', price: 220, category: 'home', subcategory: 'spices', description: 'Whole coriander seeds 500g', rating: 4.4, stock: 100 },
  { title: 'Mustard Seeds', price: 180, category: 'home', subcategory: 'spices', description: 'Black mustard seeds 500g', rating: 4.3, stock: 90 },
  { title: 'Fenugreek Seeds', price: 160, category: 'home', subcategory: 'spices', description: 'Methi seeds 500g', rating: 4.2, stock: 80 },
  { title: 'Asafoetida Powder', price: 650, category: 'home', subcategory: 'spices', description: 'Pure asafoetida powder 50g', rating: 4.8, stock: 40 },
  { title: 'Cinnamon Sticks', price: 420, category: 'home', subcategory: 'spices', description: 'Ceylon cinnamon sticks 100g', rating: 4.6, stock: 70 },
  { title: 'Star Anise', price: 380, category: 'home', subcategory: 'spices', description: 'Whole star anise 100g', rating: 4.5, stock: 60 },

  // Home - Tea (8 products)
  { title: 'Darjeeling Black Tea', price: 850, category: 'home', subcategory: 'tea', description: 'Premium Darjeeling black tea 250g', rating: 4.8, stock: 50 },
  { title: 'Assam CTC Tea', price: 420, category: 'home', subcategory: 'tea', description: 'Strong Assam CTC tea 500g', rating: 4.6, stock: 80 },
  { title: 'Earl Grey Tea', price: 650, category: 'home', subcategory: 'tea', description: 'Bergamot flavored Earl Grey tea 200g', rating: 4.5, stock: 40 },
  { title: 'Masala Chai Tea', price: 380, category: 'home', subcategory: 'tea', description: 'Spiced masala chai blend 250g', rating: 4.7, stock: 60 },
  { title: 'Green Tea', price: 520, category: 'home', subcategory: 'tea', description: 'Himalayan green tea leaves 200g', rating: 4.4, stock: 70 },
  { title: 'Oolong Tea', price: 950, category: 'home', subcategory: 'tea', description: 'Premium oolong tea 150g', rating: 4.6, stock: 30 },
  { title: 'White Tea', price: 1200, category: 'home', subcategory: 'tea', description: 'Delicate white tea buds 100g', rating: 4.8, stock: 25 },
  { title: 'Tulsi Tea', price: 280, category: 'home', subcategory: 'tea', description: 'Holy basil herbal tea 100g', rating: 4.3, stock: 90 },

  // Home - Grains (8 products)
  { title: 'Basmati Rice', price: 320, category: 'home', subcategory: 'grains', description: 'Premium aged basmati rice 1kg', rating: 4.7, stock: 200 },
  { title: 'Red Rice', price: 180, category: 'home', subcategory: 'grains', description: 'Organic red rice 1kg', rating: 4.5, stock: 150 },
  { title: 'Quinoa', price: 450, category: 'home', subcategory: 'grains', description: 'Imported quinoa seeds 500g', rating: 4.4, stock: 80 },
  { title: 'Millets Mix', price: 220, category: 'home', subcategory: 'grains', description: 'Mixed millets 1kg', rating: 4.3, stock: 120 },
  { title: 'Wheat Flour', price: 85, category: 'home', subcategory: 'grains', description: 'Whole wheat flour 1kg', rating: 4.2, stock: 300 },
  { title: 'Chickpea Flour', price: 120, category: 'home', subcategory: 'grains', description: 'Besan chickpea flour 1kg', rating: 4.4, stock: 180 },
  { title: 'Rice Flour', price: 95, category: 'home', subcategory: 'grains', description: 'Fine rice flour 1kg', rating: 4.1, stock: 200 },
  { title: 'Ragi Flour', price: 140, category: 'home', subcategory: 'grains', description: 'Finger millet flour 1kg', rating: 4.3, stock: 100 },

  // Home - Pickles (6 products)
  { title: 'Mango Pickle', price: 280, category: 'home', subcategory: 'pickles', description: 'Traditional mango pickle 500g', rating: 4.6, stock: 80 },
  { title: 'Lime Pickle', price: 220, category: 'home', subcategory: 'pickles', description: 'Tangy lime pickle 400g', rating: 4.5, stock: 90 },
  { title: 'Mixed Vegetable Pickle', price: 320, category: 'home', subcategory: 'pickles', description: 'Mixed vegetable pickle 500g', rating: 4.4, stock: 70 },
  { title: 'Garlic Pickle', price: 350, category: 'home', subcategory: 'pickles', description: 'Spicy garlic pickle 300g', rating: 4.7, stock: 60 },
  { title: 'Gongura Pickle', price: 380, category: 'home', subcategory: 'pickles', description: 'Andhra gongura pickle 400g', rating: 4.8, stock: 50 },
  { title: 'Amla Pickle', price: 250, category: 'home', subcategory: 'pickles', description: 'Healthy amla pickle 400g', rating: 4.3, stock: 75 },

  // Home - Sweets (6 products)
  { title: 'Kaju Katli', price: 850, category: 'home', subcategory: 'sweets', description: 'Premium cashew fudge 500g', rating: 4.8, stock: 40 },
  { title: 'Rasgulla', price: 320, category: 'home', subcategory: 'sweets', description: 'Bengali rasgulla 1kg', rating: 4.6, stock: 60 },
  { title: 'Gulab Jamun', price: 280, category: 'home', subcategory: 'sweets', description: 'Soft gulab jamun 1kg', rating: 4.5, stock: 70 },
  { title: 'Mysore Pak', price: 450, category: 'home', subcategory: 'sweets', description: 'Traditional Mysore pak 500g', rating: 4.7, stock: 50 },
  { title: 'Jalebi', price: 220, category: 'home', subcategory: 'sweets', description: 'Fresh jalebi 500g', rating: 4.4, stock: 80 },
  { title: 'Laddu', price: 380, category: 'home', subcategory: 'sweets', description: 'Besan laddu 500g', rating: 4.5, stock: 65 },

  // Home - Pottery (6 products)
  { title: 'Terracotta Water Pot', price: 450, category: 'home', subcategory: 'pottery', description: 'Traditional terracotta water storage pot', rating: 4.6, stock: 50 },
  { title: 'Blue Pottery Vase', price: 850, category: 'home', subcategory: 'pottery', description: 'Jaipur blue pottery decorative vase', rating: 4.7, stock: 25 },
  { title: 'Clay Tea Cups Set', price: 320, category: 'home', subcategory: 'pottery', description: 'Set of 6 clay tea cups', rating: 4.4, stock: 40 },
  { title: 'Ceramic Dinner Plates', price: 1200, category: 'home', subcategory: 'pottery', description: 'Set of 6 handmade ceramic plates', rating: 4.5, stock: 30 },
  { title: 'Earthen Cooking Pot', price: 680, category: 'home', subcategory: 'pottery', description: 'Traditional earthen cooking pot', rating: 4.8, stock: 35 },
  { title: 'Decorative Pottery Bowl', price: 380, category: 'home', subcategory: 'pottery', description: 'Hand-painted decorative pottery bowl', rating: 4.3, stock: 45 },

  // Home - Textiles (6 products)
  { title: 'Handwoven Cotton Bedsheet', price: 1800, category: 'home', subcategory: 'textiles', description: 'Handwoven cotton bedsheet with pillow covers', rating: 4.6, stock: 40 },
  { title: 'Block Print Tablecloth', price: 850, category: 'home', subcategory: 'textiles', description: 'Hand block printed cotton tablecloth', rating: 4.5, stock: 50 },
  { title: 'Khadi Towel Set', price: 650, category: 'home', subcategory: 'textiles', description: 'Set of 3 khadi cotton towels', rating: 4.4, stock: 60 },
  { title: 'Ikat Cushion Covers', price: 480, category: 'home', subcategory: 'textiles', description: 'Set of 4 ikat cushion covers', rating: 4.3, stock: 70 },
  { title: 'Handloom Curtains', price: 1200, category: 'home', subcategory: 'textiles', description: 'Handloom cotton curtains pair', rating: 4.5, stock: 30 },
  { title: 'Dhurrie Rug', price: 2200, category: 'home', subcategory: 'textiles', description: 'Handwoven cotton dhurrie rug', rating: 4.7, stock: 20 },

  // Accessories - Jewelry (8 products)
  { title: 'Kundan Necklace Set', price: 3500, category: 'accessories', subcategory: 'jewelry', description: 'Traditional kundan necklace with earrings', rating: 4.7, stock: 15 },
  { title: 'Silver Jhumka Earrings', price: 1200, category: 'accessories', subcategory: 'jewelry', description: 'Handcrafted silver jhumka earrings', rating: 4.6, stock: 25 },
  { title: 'Temple Jewelry Set', price: 2800, category: 'accessories', subcategory: 'jewelry', description: 'South Indian temple jewelry set', rating: 4.8, stock: 12 },
  { title: 'Oxidized Silver Bangles', price: 850, category: 'accessories', subcategory: 'jewelry', description: 'Set of 4 oxidized silver bangles', rating: 4.5, stock: 30 },
  { title: 'Meenakari Pendant', price: 1800, category: 'accessories', subcategory: 'jewelry', description: 'Rajasthani meenakari pendant with chain', rating: 4.6, stock: 20 },
  { title: 'Pearl Necklace', price: 2200, category: 'accessories', subcategory: 'jewelry', description: 'Freshwater pearl necklace', rating: 4.4, stock: 18 },
  { title: 'Nose Ring', price: 450, category: 'accessories', subcategory: 'jewelry', description: 'Traditional gold-plated nose ring', rating: 4.3, stock: 40 },
  { title: 'Anklet Pair', price: 680, category: 'accessories', subcategory: 'jewelry', description: 'Silver anklet pair with bells', rating: 4.5, stock: 35 },

  // Accessories - Bags (6 products)
  { title: 'Jute Shopping Bag', price: 280, category: 'accessories', subcategory: 'bags', description: 'Eco-friendly jute shopping bag', rating: 4.3, stock: 100 },
  { title: 'Leather Handbag', price: 2500, category: 'accessories', subcategory: 'bags', description: 'Handcrafted leather handbag', rating: 4.6, stock: 25 },
  { title: 'Canvas Tote Bag', price: 450, category: 'accessories', subcategory: 'bags', description: 'Block printed canvas tote bag', rating: 4.4, stock: 60 },
  { title: 'Embroidered Clutch', price: 850, category: 'accessories', subcategory: 'bags', description: 'Hand embroidered evening clutch', rating: 4.5, stock: 35 },
  { title: 'Khadi Sling Bag', price: 650, category: 'accessories', subcategory: 'bags', description: 'Handwoven khadi sling bag', rating: 4.4, stock: 40 },
  { title: 'Banjara Jhola Bag', price: 750, category: 'accessories', subcategory: 'bags', description: 'Traditional Banjara jhola bag with mirrors', rating: 4.6, stock: 30 },

  // Accessories - Footwear (6 products)
  { title: 'Kolhapuri Chappals', price: 1200, category: 'accessories', subcategory: 'footwear', description: 'Authentic Kolhapuri leather chappals', rating: 4.7, stock: 50 },
  { title: 'Juttis Punjabi', price: 850, category: 'accessories', subcategory: 'footwear', description: 'Embroidered Punjabi juttis', rating: 4.5, stock: 40 },
  { title: 'Mojaris Rajasthani', price: 950, category: 'accessories', subcategory: 'footwear', description: 'Traditional Rajasthani mojaris', rating: 4.6, stock: 35 },
  { title: 'Paduka Wooden', price: 450, category: 'accessories', subcategory: 'footwear', description: 'Traditional wooden paduka sandals', rating: 4.3, stock: 60 },
  { title: 'Nagra Shoes', price: 1500, category: 'accessories', subcategory: 'footwear', description: 'Handcrafted nagra shoes for men', rating: 4.8, stock: 25 },
  { title: 'Khussa Shoes', price: 1100, category: 'accessories', subcategory: 'footwear', description: 'Embroidered khussa shoes', rating: 4.4, stock: 30 },

  // Accessories - General (6 products)
  { title: 'Brass Pooja Items', price: 850, category: 'accessories', subcategory: 'accessories', description: 'Set of brass pooja items', rating: 4.6, stock: 40 },
  { title: 'Wooden Hair Comb', price: 280, category: 'accessories', subcategory: 'accessories', description: 'Handcrafted wooden hair comb', rating: 4.4, stock: 80 },
  { title: 'Silk Scarves', price: 650, category: 'accessories', subcategory: 'accessories', description: 'Hand-painted silk scarves', rating: 4.5, stock: 50 },
  { title: 'Brass Bangles Set', price: 450, category: 'accessories', subcategory: 'accessories', description: 'Traditional brass bangles set', rating: 4.3, stock: 60 },
  { title: 'Wooden Sunglasses', price: 1200, category: 'accessories', subcategory: 'accessories', description: 'Eco-friendly wooden sunglasses', rating: 4.7, stock: 25 },
  { title: 'Handwoven Belt', price: 380, category: 'accessories', subcategory: 'accessories', description: 'Handwoven cotton belt', rating: 4.2, stock: 70 },

  // Home - Furniture (6 products)
  { title: 'Wooden Dining Table', price: 25000, category: 'home', subcategory: 'furniture', description: 'Handcrafted wooden dining table for 6', rating: 4.8, stock: 5 },
  { title: 'Cane Chair Set', price: 8500, category: 'home', subcategory: 'furniture', description: 'Set of 4 traditional cane chairs', rating: 4.6, stock: 10 },
  { title: 'Wooden Bookshelf', price: 12000, category: 'home', subcategory: 'furniture', description: 'Solid wood bookshelf with 5 shelves', rating: 4.7, stock: 8 },
  { title: 'Jhoola Swing', price: 15000, category: 'home', subcategory: 'furniture', description: 'Traditional wooden jhoola swing', rating: 4.9, stock: 3 },
  { title: 'Storage Chest', price: 6500, category: 'home', subcategory: 'furniture', description: 'Carved wooden storage chest', rating: 4.5, stock: 12 },
  { title: 'Low Seating Diwan', price: 18000, category: 'home', subcategory: 'furniture', description: 'Traditional low seating diwan with cushions', rating: 4.6, stock: 6 },

  // Home - Kitchenware (6 products)
  { title: 'Brass Utensils Set', price: 3500, category: 'home', subcategory: 'kitchenware', description: 'Traditional brass cooking utensils set', rating: 4.7, stock: 20 },
  { title: 'Copper Water Bottle', price: 850, category: 'home', subcategory: 'kitchenware', description: 'Pure copper water bottle 1L', rating: 4.8, stock: 50 },
  { title: 'Wooden Spice Box', price: 1200, category: 'home', subcategory: 'kitchenware', description: 'Handcrafted wooden spice box with 7 compartments', rating: 4.6, stock: 30 },
  { title: 'Clay Tandoor Pot', price: 2200, category: 'home', subcategory: 'kitchenware', description: 'Traditional clay tandoor cooking pot', rating: 4.9, stock: 15 },
  { title: 'Bamboo Steamer', price: 650, category: 'home', subcategory: 'kitchenware', description: 'Eco-friendly bamboo steamer set', rating: 4.4, stock: 40 },
  { title: 'Stone Grinding Set', price: 1800, category: 'home', subcategory: 'kitchenware', description: 'Traditional stone grinding set for spices', rating: 4.8, stock: 25 },

  // Home - Decor (6 products)
  { title: 'Brass Wall Hangings', price: 1500, category: 'home', subcategory: 'decor', description: 'Traditional brass wall hanging set', rating: 4.6, stock: 30 },
  { title: 'Wooden Carved Frame', price: 850, category: 'home', subcategory: 'decor', description: 'Handcarved wooden photo frame', rating: 4.5, stock: 40 },
  { title: 'Mandala Wall Art', price: 1200, category: 'home', subcategory: 'decor', description: 'Hand-painted mandala wall art', rating: 4.7, stock: 25 },
  { title: 'Copper Wind Chimes', price: 650, category: 'home', subcategory: 'decor', description: 'Handcrafted copper wind chimes', rating: 4.4, stock: 50 },
  { title: 'Marble Inlay Work', price: 2500, category: 'home', subcategory: 'decor', description: 'Marble inlay decorative piece', rating: 4.8, stock: 15 },
  { title: 'Wooden Elephant Statue', price: 950, category: 'home', subcategory: 'decor', description: 'Carved wooden elephant statue', rating: 4.5, stock: 35 },

  // Home - Lighting (6 products)
  { title: 'Brass Diya Set', price: 450, category: 'home', subcategory: 'lighting', description: 'Traditional brass diya set of 12', rating: 4.6, stock: 60 },
  { title: 'Paper Lanterns', price: 320, category: 'home', subcategory: 'lighting', description: 'Handmade paper lanterns set of 6', rating: 4.3, stock: 80 },
  { title: 'Wooden Table Lamp', price: 1200, category: 'home', subcategory: 'lighting', description: 'Handcrafted wooden table lamp', rating: 4.7, stock: 25 },
  { title: 'Copper Hanging Lamp', price: 1800, category: 'home', subcategory: 'lighting', description: 'Traditional copper hanging lamp', rating: 4.8, stock: 20 },
  { title: 'Bamboo Floor Lamp', price: 2200, category: 'home', subcategory: 'lighting', description: 'Eco-friendly bamboo floor lamp', rating: 4.5, stock: 15 },
  { title: 'Clay Oil Lamps', price: 180, category: 'home', subcategory: 'lighting', description: 'Traditional clay oil lamps set of 10', rating: 4.4, stock: 100 },

  // Home - Storage (6 products)
  { title: 'Bamboo Storage Baskets', price: 850, category: 'home', subcategory: 'storage', description: 'Set of 3 bamboo storage baskets', rating: 4.5, stock: 40 },
  { title: 'Wooden Jewelry Box', price: 1200, category: 'home', subcategory: 'storage', description: 'Handcrafted wooden jewelry box', rating: 4.7, stock: 30 },
  { title: 'Jute Storage Bags', price: 450, category: 'home', subcategory: 'storage', description: 'Set of 5 jute storage bags', rating: 4.3, stock: 60 },
  { title: 'Cane Storage Trunk', price: 2500, category: 'home', subcategory: 'storage', description: 'Large cane storage trunk', rating: 4.6, stock: 20 },
  { title: 'Cloth Storage Boxes', price: 650, category: 'home', subcategory: 'storage', description: 'Handwoven cloth storage boxes set', rating: 4.4, stock: 50 },
  { title: 'Wooden Spice Rack', price: 950, category: 'home', subcategory: 'storage', description: 'Wall-mounted wooden spice rack', rating: 4.8, stock: 35 },

  // Home - Carpets (6 products)
  { title: 'Kashmiri Carpet', price: 15000, category: 'home', subcategory: 'carpets', description: 'Handwoven Kashmiri wool carpet 6x4 ft', rating: 4.9, stock: 8 },
  { title: 'Jute Area Rug', price: 2200, category: 'home', subcategory: 'carpets', description: 'Natural jute area rug 5x3 ft', rating: 4.5, stock: 25 },
  { title: 'Cotton Dhurrie', price: 1800, category: 'home', subcategory: 'carpets', description: 'Handwoven cotton dhurrie 4x6 ft', rating: 4.6, stock: 30 },
  { title: 'Silk Persian Rug', price: 25000, category: 'home', subcategory: 'carpets', description: 'Authentic silk Persian rug 8x5 ft', rating: 4.9, stock: 5 },
  { title: 'Kilim Floor Mat', price: 950, category: 'home', subcategory: 'carpets', description: 'Traditional kilim floor mat', rating: 4.4, stock: 40 },
  { title: 'Bamboo Floor Mat', price: 650, category: 'home', subcategory: 'carpets', description: 'Eco-friendly bamboo floor mat', rating: 4.3, stock: 50 },

  // Home - Oils (6 products)
  { title: 'Coconut Oil', price: 320, category: 'home', subcategory: 'oils', description: 'Cold-pressed coconut oil 500ml', rating: 4.7, stock: 100 },
  { title: 'Mustard Oil', price: 280, category: 'home', subcategory: 'oils', description: 'Pure mustard oil 1L', rating: 4.6, stock: 120 },
  { title: 'Sesame Oil', price: 450, category: 'home', subcategory: 'oils', description: 'Cold-pressed sesame oil 500ml', rating: 4.8, stock: 80 },
  { title: 'Groundnut Oil', price: 350, category: 'home', subcategory: 'oils', description: 'Pure groundnut oil 1L', rating: 4.5, stock: 90 },
  { title: 'Sunflower Oil', price: 180, category: 'home', subcategory: 'oils', description: 'Refined sunflower oil 1L', rating: 4.3, stock: 150 },
  { title: 'Ghee Pure', price: 850, category: 'home', subcategory: 'oils', description: 'Pure cow ghee 500g', rating: 4.9, stock: 60 },

  // Home - Honey (6 products)
  { title: 'Wild Forest Honey', price: 650, category: 'home', subcategory: 'honey', description: 'Raw wild forest honey 500g', rating: 4.8, stock: 50 },
  { title: 'Acacia Honey', price: 580, category: 'home', subcategory: 'honey', description: 'Pure acacia honey 500g', rating: 4.7, stock: 60 },
  { title: 'Eucalyptus Honey', price: 620, category: 'home', subcategory: 'honey', description: 'Eucalyptus honey 500g', rating: 4.6, stock: 45 },
  { title: 'Multifloral Honey', price: 480, category: 'home', subcategory: 'honey', description: 'Multifloral honey 500g', rating: 4.5, stock: 70 },
  { title: 'Jamun Honey', price: 750, category: 'home', subcategory: 'honey', description: 'Jamun flower honey 500g', rating: 4.9, stock: 35 },
  { title: 'Litchi Honey', price: 680, category: 'home', subcategory: 'honey', description: 'Litchi flower honey 500g', rating: 4.7, stock: 40 },

  // Home - Dry Fruits (6 products)
  { title: 'Kashmiri Almonds', price: 1200, category: 'home', subcategory: 'dryfruits', description: 'Premium Kashmiri almonds 500g', rating: 4.8, stock: 40 },
  { title: 'California Walnuts', price: 950, category: 'home', subcategory: 'dryfruits', description: 'Fresh California walnuts 500g', rating: 4.7, stock: 50 },
  { title: 'Iranian Pistachios', price: 1500, category: 'home', subcategory: 'dryfruits', description: 'Premium Iranian pistachios 500g', rating: 4.9, stock: 30 },
  { title: 'Medjool Dates', price: 850, category: 'home', subcategory: 'dryfruits', description: 'Soft Medjool dates 500g', rating: 4.8, stock: 60 },
  { title: 'Turkish Figs', price: 750, category: 'home', subcategory: 'dryfruits', description: 'Dried Turkish figs 500g', rating: 4.6, stock: 45 },
  { title: 'Mixed Dry Fruits', price: 1100, category: 'home', subcategory: 'dryfruits', description: 'Premium mixed dry fruits 500g', rating: 4.7, stock: 55 }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const productsWithImages = products.map((product, index) => ({
      ...product,
      images: [{
        url: `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.title)}`,
        publicId: `placeholder_${index}`
      }]
    }));

    await Product.insertMany(productsWithImages);
    console.log(`Seeded ${productsWithImages.length} products successfully`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();