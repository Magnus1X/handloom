import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, MapPin, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ordersAPI } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-earth-terracotta"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex items-center justify-center`}>
        <div className="text-center">
          <Package className={`h-24 w-24 ${isDark ? 'text-white/30' : 'text-earth-brown/30'} mx-auto mb-4`} />
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>No orders yet</h2>
          <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'} mb-6`}>Start shopping to see your orders here</p>
          <Link to="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-8`}>My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id} className={isDark ? 'bg-black/50 border-white/10' : ''}>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-earth-brown'}`}>
                      Order #{order._id.slice(-8)}
                    </CardTitle>
                    <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mt-1`}>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
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
                    <span className="text-lg font-bold text-earth-terracotta">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>Items ({order.items.length})</h4>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${isDark ? 'bg-white/10' : 'bg-gray-100'} rounded-lg overflow-hidden flex-shrink-0`}>
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} truncate`}>
                              {item.title}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                          +{order.items.length - 2} more items
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-2 flex items-center`}>
                      <MapPin className="h-4 w-4 mr-1" />
                      Shipping Address
                    </h4>
                    <div className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} space-y-1`}>
                      <p className="font-medium">{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.phone}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`flex justify-end pt-4 border-t ${isDark ? 'border-white/10' : 'border-earth-beige'}`}>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;