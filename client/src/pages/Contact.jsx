import { Phone, MessageCircle, Mail, MapPin, Clock, Headphones } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-earth-terracotta" />,
      title: 'Call Customer Care',
      details: '+91 98765 43210',
      subtitle: 'Mon-Fri, 9 AM - 6 PM IST',
      action: 'Call Now',
      link: 'tel:+919876543210'
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: 'WhatsApp Support',
      details: '+91 98765 43210',
      subtitle: 'Quick responses, 24/7',
      action: 'Message on WhatsApp',
      link: 'https://wa.me/919876543210'
    },
    {
      icon: <Mail className="h-8 w-8 text-earth-terracotta" />,
      title: 'Email Support',
      details: 'hello@houseofhomegrown.com',
      subtitle: 'We reply within 24 hours',
      action: 'Send Email',
      link: 'mailto:hello@houseofhomegrown.com'
    }
  ];

  const supportTopics = [
    {
      icon: <Headphones className="h-6 w-6 text-earth-sage" />,
      title: 'Order Support',
      description: 'Track orders, delivery updates, order modifications'
    },
    {
      icon: <Phone className="h-6 w-6 text-earth-sage" />,
      title: 'Product Inquiries',
      description: 'Product details, availability, recommendations'
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-earth-sage" />,
      title: 'Returns & Exchanges',
      description: 'Return policy, exchange requests, refund status'
    },
    {
      icon: <Mail className="h-6 w-6 text-earth-sage" />,
      title: 'General Support',
      description: 'Account issues, payment queries, technical help'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>Customer Care</h1>
            <p className={`text-xl ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
              Need help? Our customer care team is here to assist you with orders, products, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-6`}>Get in Touch</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <Card key={index} className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>{method.title}</h3>
                          <p className={`${isDark ? 'text-white' : 'text-earth-brown'} font-medium mb-1`}>{method.details}</p>
                          <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'} mb-3`}>{method.subtitle}</p>
                          <a href={method.link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="body-font">{method.action}</Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-6`}>How We Can Help</h2>
                <div className="grid grid-cols-1 gap-4">
                  {supportTopics.map((topic, index) => (
                    <Card key={index} className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {topic.icon}
                          </div>
                          <div>
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>{topic.title}</h3>
                            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>{topic.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className={`${isDark ? 'bg-black/30 border-white/10' : 'bg-earth-sage/10 border-earth-beige'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <MapPin className="h-6 w-6 text-earth-terracotta flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>Our Location</h3>
                      <p className={`body-font ${isDark ? 'text-white/80' : 'text-earth-brown/80'} mb-1`}>Mumbai, Maharashtra, India</p>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Visit by appointment only</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-earth-terracotta flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>Business Hours</h3>
                      <p className={`body-font ${isDark ? 'text-white/80' : 'text-earth-brown/80'} mb-1`}>Monday - Friday: 9 AM - 6 PM IST</p>
                      <p className={`body-font ${isDark ? 'text-white/80' : 'text-earth-brown/80'}`}>Saturday: 10 AM - 4 PM IST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${isDark ? 'bg-black/30 border-white/10' : 'bg-earth-sage/10 border-earth-beige'}`}>
                <CardContent className="p-6">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-3`}>Quick Help</h3>
                  <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} text-sm leading-relaxed mb-4`}>
                    Find answers to common questions or learn about our policies.
                  </p>
                  <div className="space-y-2">
                    <a href="/faq" className="text-earth-terracotta hover:underline text-sm font-medium block">
                      Frequently Asked Questions →
                    </a>
                    <a href="/shipping" className="text-earth-terracotta hover:underline text-sm font-medium block">
                      Shipping & Returns Policy →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;