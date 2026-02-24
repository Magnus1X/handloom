import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useTheme } from '../context/ThemeContext';
import { productsAPI } from '../utils/api';

const SUBCATEGORIES = {
  clothing: ['Sarees', 'Kurtas', 'Lehengas', 'Fabrics', 'Traditional Wear'],
  home: ['Pottery', 'Textiles', 'Kitchenware', 'Furniture', 'Decor'],
  wellness: ['Ayurveda', 'Yoga', 'Meditation', 'Herbal Products'],
  beauty: ['Skincare', 'Haircare', 'Natural Cosmetics', 'Essential Oils'],
  accessories: ['Jewelry', 'Bags', 'Footwear', 'Handicrafts']
};

const Admin = () => {
  const { isDark } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    category: 'clothing',
    subcategory: '',
    description: '',
    stock: '',
    gender: '',
    sizes: [{ size: '', stock: '' }],
    images: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setProductData({...productData, category, subcategory: '', gender: '', sizes: [{ size: '', stock: '' }]});
  };

  const addSizeField = () => {
    setProductData({...productData, sizes: [...productData.sizes, { size: '', stock: '' }]});
  };

  const removeSizeField = (index) => {
    const newSizes = productData.sizes.filter((_, i) => i !== index);
    setProductData({...productData, sizes: newSizes});
  };

  const updateSizeField = (index, field, value) => {
    const newSizes = [...productData.sizes];
    newSizes[index][field] = value;
    setProductData({...productData, sizes: newSizes});
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Adding product...');
    
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('subcategory', productData.subcategory);
    formData.append('description', productData.description);
    if (productData.category === 'clothing') {
      formData.append('gender', productData.gender);
      formData.append('sizes', JSON.stringify(productData.sizes));
    } else {
      formData.append('stock', productData.stock);
    }
    
    for (let i = 0; i < productData.images.length; i++) {
      formData.append('images', productData.images[i]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        toast.success('Product added successfully!', { id: loadingToast });
        setShowAddProduct(false);
        setProductData({
          title: '',
          price: '',
          category: 'clothing',
          subcategory: '',
          description: '',
          stock: '',
          gender: '',
          sizes: [{ size: '', stock: '' }],
          images: []
        });
        fetchProducts();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add product', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Network error occurred', { id: loadingToast });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductData({
      title: product.title,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      stock: product.stock || '',
      gender: product.gender || '',
      sizes: product.sizes || [{ size: '', stock: '' }],
      images: []
    });
    setShowEditProduct(true);
  };

  const handleDeleteProduct = async (productId) => {
    toast((t) => (
      <div className="flex items-center space-x-3">
        <div>
          <p className="font-medium text-earth-brown dark:text-white">Delete Product?</p>
          <p className="text-sm text-earth-brown/70 dark:text-white/70">This action cannot be undone.</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteProduct(productId);
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-earth-brown/10 text-earth-brown px-3 py-1 rounded text-sm hover:bg-earth-brown/20 font-medium dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: 'white',
        color: '#8B4513',
        border: '1px solid #E8DCC0',
        padding: '16px',
        minWidth: '300px'
      }
    });
  };

  const deleteProduct = async (productId) => {
    const loadingToast = toast.loading('Deleting product...');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Product deleted successfully!', { id: loadingToast });
        fetchProducts();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete product', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Network error occurred', { id: loadingToast });
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Updating product...');
    
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('subcategory', productData.subcategory);
    formData.append('description', productData.description);
    if (productData.category === 'clothing') {
      formData.append('gender', productData.gender);
      formData.append('sizes', JSON.stringify(productData.sizes));
    } else {
      formData.append('stock', productData.stock);
    }
    
    for (let i = 0; i < productData.images.length; i++) {
      formData.append('images', productData.images[i]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        toast.success('Product updated successfully!', { id: loadingToast });
        setShowEditProduct(false);
        setEditingProduct(null);
        setProductData({
          title: '',
          price: '',
          category: 'clothing',
          subcategory: '',
          description: '',
          stock: '',
          gender: '',
          sizes: [{ size: '', stock: '' }],
          images: []
        });
        fetchProducts();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to update product', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Network error occurred', { id: loadingToast });
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>
                Admin Dashboard
              </h1>
              <p className={`text-xl ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                Manage your products and inventory
              </p>
            </div>
            <Button onClick={() => setShowAddProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <Card className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                <Package className="h-5 w-5 mr-2" />
                Products ({products.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className={`p-4 rounded-lg border ${isDark ? 'border-white/10 bg-white/5' : 'border-earth-beige bg-earth-cream/20'} flex items-center justify-between`}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.imageUrl || product.images?.[0]?.url}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                            {product.title}
                          </h3>
                          <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                            ₹{product.price} • {product.category} • Stock: {product.totalStock || product.stock}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-black border-white/10' : 'bg-white border-earth-beige'} border rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-earth-brown'}`}>Edit Product</h3>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Title</label>
                <Input
                  value={productData.title}
                  onChange={(e) => setProductData({...productData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Price (₹)</label>
                <Input
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData({...productData, price: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Description</label>
                <textarea
                  value={productData.description}
                  onChange={(e) => setProductData({...productData, description: e.target.value})}
                  className={`w-full p-2 border rounded h-20 ${isDark ? 'bg-black border-white/20 text-white placeholder:text-white/50' : 'bg-white border-earth-brown/20 text-earth-brown placeholder:text-earth-brown/50'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Images (1-4 images, optional)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setProductData({...productData, images: Array.from(e.target.files)})}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-black border-white/20 text-white file:bg-white/10 file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:mr-2' : 'bg-white border-earth-brown/20 text-earth-brown file:bg-earth-cream file:text-earth-brown file:border-0 file:rounded file:px-2 file:py-1 file:mr-2'}`}
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">Update Product</Button>
                <Button type="button" variant="outline" onClick={() => setShowEditProduct(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-black border-white/10' : 'bg-white border-earth-beige'} border rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-earth-brown'}`}>Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Title</label>
                <Input
                  value={productData.title}
                  onChange={(e) => setProductData({...productData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Price (₹)</label>
                <Input
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData({...productData, price: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Category</label>
                <select
                  value={productData.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-earth-brown/20 text-earth-brown'}`}
                >
                  <option value="clothing">Clothing</option>
                  <option value="home">Home</option>
                  <option value="wellness">Wellness</option>
                  <option value="beauty">Beauty</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Subcategory</label>
                <select
                  value={productData.subcategory}
                  onChange={(e) => setProductData({...productData, subcategory: e.target.value})}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-earth-brown/20 text-earth-brown'}`}
                  required
                >
                  <option value="">Select Subcategory</option>
                  {SUBCATEGORIES[productData.category].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              {productData.category === 'clothing' && (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Gender</label>
                  <select
                    value={productData.gender}
                    onChange={(e) => setProductData({...productData, gender: e.target.value})}
                    className={`w-full p-2 border rounded ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-earth-brown/20 text-earth-brown'}`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
              )}
              {productData.category === 'clothing' ? (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Sizes & Stock</label>
                  {productData.sizes.map((sizeData, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <Input
                        placeholder="Size (S, M, L, XL)"
                        value={sizeData.size}
                        onChange={(e) => updateSizeField(index, 'size', e.target.value)}
                        required
                      />
                      <Input
                        type="number"
                        placeholder="Stock"
                        value={sizeData.stock}
                        onChange={(e) => updateSizeField(index, 'stock', e.target.value)}
                        required
                      />
                      {productData.sizes.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeSizeField(index)}>
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addSizeField}>
                    Add Size
                  </Button>
                </div>
              ) : (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Stock</label>
                  <Input
                    type="number"
                    value={productData.stock}
                    onChange={(e) => setProductData({...productData, stock: e.target.value})}
                    required
                  />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Description</label>
                <textarea
                  value={productData.description}
                  onChange={(e) => setProductData({...productData, description: e.target.value})}
                  className={`w-full p-2 border rounded h-20 ${isDark ? 'bg-black border-white/20 text-white placeholder:text-white/50' : 'bg-white border-earth-brown/20 text-earth-brown placeholder:text-earth-brown/50'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Images (1-4 images)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setProductData({...productData, images: Array.from(e.target.files)})}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-black border-white/20 text-white file:bg-white/10 file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:mr-2' : 'bg-white border-earth-brown/20 text-earth-brown file:bg-earth-cream file:text-earth-brown file:border-0 file:rounded file:px-2 file:py-1 file:mr-2'}`}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">Add Product</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;