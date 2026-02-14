import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { productsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      addToCart(product, quantity);
      toast.success(`${quantity} ${product.title} added to cart!`);
      setQuantity(1);
      setTimeout(() => setIsAdding(false), 600);
    }
  };

  const incrementQuantity = () => {
    if (product && (!product.stock || quantity < product.stock)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-earth-terracotta"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-earth-brown mb-4">Product not found</h2>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className={`mb-6 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className={`aspect-square overflow-hidden rounded-lg ${isDark ? 'bg-card' : 'bg-white'}`}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className={`${isDark ? 'bg-white/10 text-white' : 'bg-earth-beige text-earth-brown'}`}>{product.category}</Badge>
                {product.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>{product.rating}</span>
                  </div>
                )}
              </div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>{product.title}</h1>
              <p className="text-2xl font-bold text-earth-terracotta mb-4">₹{product.price}</p>
              {product.stock && product.stock < 10 && (
                <p className="text-orange-400 font-medium">Only {product.stock} left in stock</p>
              )}
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>Description</h3>
              <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} leading-relaxed`}>{product.description}</p>
            </div>

            <Card className={`${isDark ? 'bg-card border-border' : 'bg-white border-earth-beige'}`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-2 block`}>Quantity</label>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className={`${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-earth-cream border-earth-brown/20 text-earth-brown hover:bg-earth-beige'}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className={`text-lg font-medium w-12 text-center ${isDark ? 'text-white' : 'text-earth-brown'}`}>{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={product.stock && quantity >= product.stock}
                        className={`${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-earth-cream border-earth-brown/20 text-earth-brown hover:bg-earth-beige'}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-earth-beige'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-lg font-medium ${isDark ? 'text-white' : 'text-earth-brown'}`}>Total:</span>
                      <span className="text-2xl font-bold text-earth-terracotta">
                        ₹{(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                    
                    <Button
                      onClick={handleAddToCart}
                      disabled={product.stock && product.stock === 0}
                      className={`w-full transition-all duration-300 ${isAdding ? 'scale-95 bg-green-600 hover:bg-green-600' : ''}`}
                      size="lg"
                    >
                      <ShoppingCart className={`h-5 w-5 mr-2 transition-transform duration-300 ${isAdding ? 'scale-110' : ''}`} />
                      {product.stock === 0 ? 'Out of Stock' : isAdding ? 'Added!' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${isDark ? 'bg-card border-border' : 'bg-white border-earth-beige'}`}>
              <CardContent className="p-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Category:</span>
                    <span className={`capitalize ${isDark ? 'text-white' : 'text-earth-brown'}`}>{product.category}</span>
                  </div>
                  {product.rating && (
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Rating:</span>
                      <span className={`${isDark ? 'text-white' : 'text-earth-brown'}`}>{product.rating}/5</span>
                    </div>
                  )}
                  {product.stock && (
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Stock:</span>
                      <span className={`${isDark ? 'text-white' : 'text-earth-brown'}`}>{product.stock} units</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;