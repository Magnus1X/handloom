import { Truck, RotateCcw, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Shipping = () => {
  const policies = [
    {
      icon: <Truck className="h-8 w-8 text-earth-sage" />,
      title: 'Free Shipping',
      description: 'We offer free shipping across India on all orders. No minimum order value required.'
    },
    {
      icon: <Clock className="h-8 w-8 text-earth-terracotta" />,
      title: 'Delivery Time',
      description: 'Orders typically take 5-7 business days to reach you. Remote locations may take up to 10 days.'
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-earth-brown" />,
      title: '14-Day Returns',
      description: 'Return unused items in original condition within 14 days of delivery for a full refund.'
    },
    {
      icon: <Shield className="h-8 w-8 text-earth-sage" />,
      title: 'Quality Guarantee',
      description: 'All products are quality-checked before shipping. We stand behind our craftsmanship.'
    }
  ];

  return (
    <div className="min-h-screen bg-earth-cream/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-earth-brown mb-4">Shipping & Returns</h1>
            <p className="text-xl text-earth-brown/70">
              Everything you need to know about our shipping and return policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {policies.map((policy, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {policy.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-earth-brown mb-2">{policy.title}</h3>
                      <p className="text-earth-brown/80">{policy.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-earth-brown">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Shipping Areas</h3>
                  <p className="text-earth-brown/80">We currently ship to all locations within India. International shipping is not available at this time.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Processing Time</h3>
                  <p className="text-earth-brown/80">Orders are processed within 1-2 business days. You will receive a confirmation email once your order is shipped.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Tracking</h3>
                  <p className="text-earth-brown/80">Once shipped, you will receive a tracking number to monitor your order's progress.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-earth-brown">Return Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Return Window</h3>
                  <p className="text-earth-brown/80">Items can be returned within 14 days of delivery. Please contact us within this timeframe to initiate a return.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Return Conditions</h3>
                  <ul className="list-disc list-inside text-earth-brown/80 space-y-1">
                    <li>Items must be unused and in original condition</li>
                    <li>Original packaging and tags must be intact</li>
                    <li>Personalized or custom items cannot be returned</li>
                    <li>Items must not show signs of wear or damage</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Return Process</h3>
                  <ol className="list-decimal list-inside text-earth-brown/80 space-y-1">
                    <li>Contact our customer service team</li>
                    <li>Receive return authorization and instructions</li>
                    <li>Package items securely for return</li>
                    <li>We arrange pickup or provide return address</li>
                    <li>Refund processed within 5-7 business days</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-earth-brown">Exchange Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Size Exchanges</h3>
                  <p className="text-earth-brown/80">We offer size exchanges for clothing items subject to availability. Exchange requests must be made within 14 days of delivery.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-earth-brown mb-2">Defective Items</h3>
                  <p className="text-earth-brown/80">If you receive a defective item, please contact us immediately. We will arrange for a replacement or full refund at no cost to you.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-earth-sage/10">
              <CardContent className="p-6">
                <h3 className="font-semibold text-earth-brown mb-3">Need Help?</h3>
                <p className="text-earth-brown/80 mb-4">
                  Have questions about shipping or returns? Our customer service team is here to help.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-earth-brown">
                    <strong>Email:</strong> hello@houseofhomegrown.com
                  </p>
                  <p className="text-sm text-earth-brown">
                    <strong>Phone:</strong> +91 98765 43210
                  </p>
                  <p className="text-sm text-earth-brown">
                    <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM IST
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;