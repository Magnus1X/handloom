import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useTheme } from '../context/ThemeContext';

const FAQ = () => {
  const { isDark } = useTheme();
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'We offer free shipping across India. Orders typically take 5-7 business days to reach you. For remote locations, it may take up to 10 business days.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within India. We are working on expanding our shipping to international locations soon.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes! Once your order is shipped, you will receive a tracking number via email. You can also check your order status in the "My Orders" section of your account.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'Currently, we only accept Cash on Delivery (COD). We are working on adding more payment options including UPI, cards, and net banking.'
        }
      ]
    },
    {
      category: 'Products & Quality',
      questions: [
        {
          question: 'Are your products really handmade?',
          answer: 'Yes, absolutely! All our products are handcrafted by skilled artisans across India using traditional techniques passed down through generations.'
        },
        {
          question: 'How do you ensure product quality?',
          answer: 'Each product undergoes rigorous quality checks before shipping. We work directly with artisans and visit production centers regularly to maintain our quality standards.'
        },
        {
          question: 'Are your products eco-friendly?',
          answer: 'Yes, sustainability is at the core of our mission. We use natural, organic materials and eco-friendly production processes wherever possible.'
        },
        {
          question: 'Do you have size guides for clothing?',
          answer: 'Yes, each clothing item has a detailed size guide. Our products are designed to have a comfortable, relaxed fit inspired by traditional Indian wear.'
        }
      ]
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy for unused items in original condition. Due to the handmade nature of our products, we carefully review each return request.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Contact our customer service team within 7 days of delivery. We will guide you through the return process and arrange pickup if the return is approved.'
        },
        {
          question: 'Do you offer exchanges?',
          answer: 'Yes, we offer exchanges for size or color variations subject to availability. Exchange requests must be made within 7 days of delivery.'
        },
        {
          question: 'Who pays for return shipping?',
          answer: 'For defective or incorrect items, we cover return shipping. For other returns, customers are responsible for return shipping costs.'
        }
      ]
    },
    {
      category: 'Account & Support',
      questions: [
        {
          question: 'Do I need an account to place an order?',
          answer: 'Yes, you need to create an account to place orders. This helps us provide better service and allows you to track your orders easily.'
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach us via email at hello@houseofhomegrown.com or call us at +91 98765 43210 during business hours (Mon-Fri, 9 AM - 6 PM IST).'
        },
        {
          question: 'Can I cancel my order?',
          answer: 'Orders can be cancelled within 2 hours of placement. After that, the order goes into processing and cannot be cancelled. Please contact us immediately if you need to cancel.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Currently, account information updates need to be done by contacting our customer service. We are working on adding self-service options to your account dashboard.'
        }
      ]
    }
  ];

  let questionIndex = 0;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>Frequently Asked Questions</h1>
            <p className={`text-xl ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
              Find answers to common questions about our products, orders, and policies.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-6`}>{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq) => {
                    const currentIndex = questionIndex++;
                    const isOpen = openItems.has(currentIndex);
                    
                    return (
                      <Card key={currentIndex} className={`overflow-hidden ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(currentIndex)}
                            className={`w-full text-left p-6 ${isDark ? 'hover:bg-white/5' : 'hover:bg-earth-cream/30'} transition-colors`}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} pr-4`}>{faq.question}</h3>
                              {isOpen ? (
                                <ChevronUp className={`h-5 w-5 ${isDark ? 'text-white' : 'text-earth-brown'} flex-shrink-0`} />
                              ) : (
                                <ChevronDown className={`h-5 w-5 ${isDark ? 'text-white' : 'text-earth-brown'} flex-shrink-0`} />
                              )}
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} leading-relaxed`}>{faq.answer}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className={`${isDark ? 'bg-black/30 border-white/10' : 'bg-earth-sage/10 border-earth-beige'}`}>
              <CardContent className="p-8">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>Still have questions?</h3>
                <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} mb-6`}>
                  Can't find what you're looking for? Our customer service team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Contact Us
                  </a>
                  <a
                    href="mailto:hello@houseofhomegrown.com"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Email Support
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;