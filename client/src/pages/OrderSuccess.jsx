import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useTheme } from '../context/ThemeContext';

const OrderSuccess = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const orderId = location.state?.orderId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex items-center justify-center py-12 px-4`}>
      <Card className={`w-full max-w-md text-center ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <img src="/thankyou.png" alt="Thank You" className="h-20 w-20" />
            </div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-2`}>धन्यवाद! Order Placed Successfully!</h1>
            <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Thank you for choosing House of Homegrown</p>
          </div>

          {orderId && (
            <div className={`${isDark ? 'bg-white/10' : 'bg-earth-cream/50'} p-4 rounded-lg mb-6`}>
              <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mb-1`}>Order ID</p>
              <p className={`font-mono text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'}`}>{orderId}</p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 text-left">
              <Package className="h-5 w-5 text-earth-sage flex-shrink-0" />
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-earth-brown'}`}>Order Confirmed</p>
                <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Your order has been placed and is being processed</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-left">
              <div className={`h-5 w-5 rounded-full border-2 ${isDark ? 'border-white/20' : 'border-earth-beige'} flex-shrink-0`}></div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-earth-brown'}`}>Payment on Delivery</p>
                <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Pay when your order arrives at your doorstep</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/orders" className="block">
              <Button className="w-full">
                View Order Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/shop" className="block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-earth-beige'}`}>
            <p className={`text-xs ${isDark ? 'text-white/60' : 'text-earth-brown/60'}`}>
              You will receive an email confirmation shortly with your order details.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;