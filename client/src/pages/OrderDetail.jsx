import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, RotateCcw, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ordersAPI } from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await ordersAPI.getById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isReturnEligible = (orderDate, status) => {
    const returnPolicyDays = 14;
    const orderDateTime = new Date(orderDate);
    const currentTime = new Date();
    const diffTime = Math.abs(currentTime - orderDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= returnPolicyDays;
  };

  const handleReturn = () => {
    toast.success(`Return request initiated for order ${order._id.slice(-8)}. You will be contacted within 24 hours.`);
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { label: 'Order Placed', status: 'completed' },
      { label: 'Processing', status: status === 'Placed' ? 'pending' : 'completed' },
      { label: 'Shipped', status: ['Placed', 'Processing'].includes(status) ? 'pending' : 'completed' },
      { label: 'Delivered', status: status === 'Delivered' ? 'completed' : 'pending' }
    ];
    return steps;
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-earth-terracotta"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>Order not found</h2>
          <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/orders')}
          className={`mb-6 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : ''}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className={isDark ? 'bg-black/50 border-white/10' : ''}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className={`text-2xl ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                    Order #{order._id.slice(-8)}
                  </CardTitle>
                  <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mt-2`}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="h-4 w-4" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <span className="text-2xl font-bold text-earth-terracotta">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                  {isReturnEligible(order.createdAt, order.status) && (
                    <Button variant="outline" size="sm" onClick={handleReturn} className="whitespace-nowrap">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Return Order
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Order Tracking */}
          <Card className={isDark ? 'bg-black/50 border-white/10' : ''}>
            <CardHeader>
              <CardTitle className={`${isDark ? 'text-white' : 'text-earth-brown'} flex items-center`}>
                <Truck className="h-5 w-5 mr-2" />
                Order Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                {getTrackingSteps(order.status).map((step, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : isDark 
                        ? 'bg-white/20 text-white/60' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.status === 'completed' ? '✓' : index + 1}
                    </div>
                    <span className={`text-xs mt-2 text-center ${
                      step.status === 'completed' 
                        ? 'text-green-600 font-medium' 
                        : isDark 
                        ? 'text-white/60' 
                        : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                    {index < getTrackingSteps(order.status).length - 1 && (
                      <div className={`absolute h-0.5 w-full top-4 left-1/2 -z-10 ${
                        getTrackingSteps(order.status)[index + 1].status === 'completed'
                          ? 'bg-green-500'
                          : isDark
                          ? 'bg-white/20'
                          : 'bg-gray-200'
                      }`} style={{ transform: 'translateX(50%)' }} />
                    )}
                  </div>
                ))}
              </div>
              {isReturnEligible(order.createdAt, order.status) && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    ✓ This order is eligible for return within 14 days of delivery.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={isDark ? 'bg-black/50 border-white/10' : ''}>
              <CardHeader>
                <CardTitle className={`${isDark ? 'text-white' : 'text-earth-brown'} flex items-center`}>
                  <Package className="h-5 w-5 mr-2" />
                  Order Items ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-4 ${isDark ? 'bg-white/5' : 'bg-earth-cream/30'} rounded-lg`}>
                    <div className={`w-16 h-16 ${isDark ? 'bg-white/10' : 'bg-gray-100'} rounded-lg overflow-hidden flex-shrink-0`}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-earth-brown'} truncate`}>{item.title}</h4>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-earth-terracotta">
                        ₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className={isDark ? 'bg-black/50 border-white/10' : ''}>
                <CardHeader>
                  <CardTitle className={`${isDark ? 'text-white' : 'text-earth-brown'} flex items-center`}>
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`space-y-1 ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-earth-brown'}`}>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.phone}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </p>
                    <p>{order.shippingAddress.pincode}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className={isDark ? 'bg-black/50 border-white/10' : ''}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-earth-brown'}>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`flex justify-between ${isDark ? 'text-white' : ''}`}>
                    <span>Subtotal ({order.items.length} items)</span>
                    <span>₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className={`flex justify-between ${isDark ? 'text-white' : ''}`}>
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className={`border-t ${isDark ? 'border-white/10' : ''} pt-3`}>
                    <div className={`flex justify-between text-lg font-bold ${isDark ? 'text-white' : ''}`}>
                      <span>Total</span>
                      <span className="text-earth-terracotta">₹{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={isDark ? 'bg-black/50 border-white/10' : ''}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-earth-brown'}>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className={`flex justify-between ${isDark ? 'text-white' : ''}`}>
                      <span>Payment Method:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className={`flex justify-between ${isDark ? 'text-white' : ''}`}>
                      <span>Payment Status:</span>
                      <span className="font-medium text-orange-600">Pending (COD)</span>
                    </div>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mt-3`}>
                    Payment will be collected when your order is delivered.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;