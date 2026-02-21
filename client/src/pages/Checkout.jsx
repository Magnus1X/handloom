import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useCart } from '../context/CartContext';
import { ordersAPI, profileAPI } from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import { Plus, MapPin } from 'lucide-react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await profileAPI.getAddresses();
      setAddresses(response.data);
      const defaultAddress = response.data.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let shippingAddress;
      
      if (selectedAddress) {
        shippingAddress = {
          name: selectedAddress.fullName,
          phone: selectedAddress.phone,
          street: `${selectedAddress.addressLine1}${selectedAddress.addressLine2 ? ', ' + selectedAddress.addressLine2 : ''}`,
          city: selectedAddress.city,
          state: selectedAddress.state,
          pincode: selectedAddress.pincode
        };
      } else {
        shippingAddress = formData;
      }

      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        shippingAddress,
        totalAmount: getTotalPrice()
      };

      const response = await ordersAPI.create(orderData);
      clearCart();
      navigate('/order-success', { state: { orderId: response.data.order._id } });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-8`}>Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className={isDark ? 'bg-black/50 border-white/10' : ''}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-earth-brown'}>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                {addresses.length > 0 && (
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>Select Saved Address</h3>
                    <div className="space-y-3">
                      {addresses.map((address) => (
                        <div
                          key={address._id}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedAddress?._id === address._id
                              ? 'border-earth-terracotta bg-earth-terracotta/10'
                              : isDark
                              ? 'border-white/20 bg-white/5 hover:bg-white/10'
                              : 'border-earth-beige bg-earth-cream/20 hover:bg-earth-cream/40'
                          }`}
                          onClick={() => {
                            setSelectedAddress(address);
                            setShowNewAddress(false);
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} capitalize`}>
                              <MapPin className="h-4 w-4 inline mr-1" />
                              {address.type} {address.isDefault && '(Default)'}
                            </span>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedAddress?._id === address._id
                                ? 'bg-earth-terracotta border-earth-terracotta'
                                : isDark
                                ? 'border-white/40'
                                : 'border-earth-brown/40'
                            }`}></div>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-white/80' : 'text-earth-brown/80'} mb-1`}>
                            {address.fullName} • {address.phone}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                            {address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                            {address.city}, {address.state} {address.pincode}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => {
                        setShowNewAddress(true);
                        setSelectedAddress(null);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Use New Address
                    </Button>
                  </div>
                )}
                
                {(addresses.length === 0 || showNewAddress) && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter full name"
                          className={isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className={isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : ''}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="street" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                        Street Address *
                      </label>
                      <Input
                        id="street"
                        name="street"
                        type="text"
                        required
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Enter street address"
                        className={isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : ''}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                          City *
                        </label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                          className={isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                          State *
                        </label>
                        <Input
                          id="state"
                          name="state"
                          type="text"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Enter state"
                          className={isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="pincode" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                          Pincode *
                        </label>
                        <Input
                          id="pincode"
                          name="pincode"
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Enter pincode"
                          className={isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : ''}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>Payment Method</h3>
                      <div className={`${isDark ? 'bg-white/10' : 'bg-earth-cream/50'} p-4 rounded-lg`}>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="cod" name="payment" value="cod" checked readOnly />
                          <label htmlFor="cod" className={isDark ? 'text-white' : 'text-earth-brown'}>Cash on Delivery (COD)</label>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mt-1`}>Pay when your order is delivered</p>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </form>
                )}
                
                {selectedAddress && !showNewAddress && (
                  <div className="space-y-4">
                    <div className="pt-4">
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>Payment Method</h3>
                      <div className={`${isDark ? 'bg-white/10' : 'bg-earth-cream/50'} p-4 rounded-lg`}>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="cod" name="payment" value="cod" checked readOnly />
                          <label htmlFor="cod" className={isDark ? 'text-white' : 'text-earth-brown'}>Cash on Delivery (COD)</label>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mt-1`}>Pay when your order is delivered</p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleSubmit}
                      className="w-full"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className={`sticky top-24 ${isDark ? 'bg-black/50 border-white/10' : ''}`}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-earth-brown'}>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${isDark ? 'text-white' : ''}`}>{item.title}</p>
                        <p className={`text-xs ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Qty: {item.quantity}</p>
                      </div>
                      <span className={`font-medium ${isDark ? 'text-white' : ''}`}>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className={`border-t ${isDark ? 'border-white/10' : ''} pt-4 space-y-2`}>
                  <div className={`flex justify-between ${isDark ? 'text-white' : ''}`}>
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  
                  <div className={`flex justify-between ${isDark ? 'text-white' : ''}`}>
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <div className={`flex justify-between text-lg font-bold pt-2 border-t ${isDark ? 'border-white/10 text-white' : ''}`}>
                    <span>Total</span>
                    <span className="text-earth-terracotta">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;