import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-earth-cream/30'} flex items-center justify-center`}>
        <div className="text-center">
          <ShoppingBag className={`h-24 w-24 ${isDark ? 'text-white/30' : 'text-earth-brown/30'} mx-auto mb-4`} />
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>Your cart is empty</h2>
          <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'} mb-6`}>Add some products to get started</p>
          <Link to="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-8`}>Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'}`}>{item.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} capitalize`}>{item.category}</p>
                      <p className="text-lg font-bold text-earth-terracotta">₹{item.price}</p>
                    </div>
                    
                    <div className="flex flex-col sm:items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className={`sticky top-24 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
              <CardHeader>
                <CardTitle className={`${isDark ? 'text-white' : 'text-earth-brown'}`}>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Items ({getTotalItems()})</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-earth-terracotta">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                {isAuthenticated ? (
                  <Link to="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login" state={{ from: { pathname: '/checkout' } }} className="block">
                    <Button className="w-full" size="lg">
                      Login to Checkout
                    </Button>
                  </Link>
                )}
                
                <Link to="/shop" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;