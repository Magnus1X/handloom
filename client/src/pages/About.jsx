import { Leaf, Heart, Users, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-earth-sage" />,
      title: 'Sustainability First',
      description: 'Every product is crafted with eco-friendly materials and sustainable practices, ensuring minimal environmental impact.'
    },
    {
      icon: <Heart className="h-8 w-8 text-earth-terracotta" />,
      title: 'Handcrafted Excellence',
      description: 'Our products are lovingly handcrafted by skilled artisans who have inherited traditional techniques passed down through generations.'
    },
    {
      icon: <Users className="h-8 w-8 text-earth-brown" />,
      title: 'Community Support',
      description: 'We work directly with local communities, ensuring fair wages and supporting the preservation of traditional crafts.'
    },
    {
      icon: <Award className="h-8 w-8 text-earth-sage" />,
      title: 'Premium Quality',
      description: 'Each product undergoes rigorous quality checks to ensure you receive only the finest handcrafted goods.'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-6`}>
              Our Story
            </h1>
            <p className={`text-xl ${isDark ? 'text-white/80' : 'text-earth-brown/80'} leading-relaxed`}>
              House of Homegrown was born from a deep love for India's rich cultural heritage 
              and a commitment to sustainable living.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <div className={`${isDark ? 'bg-black/50 border border-white/10' : 'bg-white border border-earth-beige'} rounded-lg p-8 shadow-sm`}>
              <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} leading-relaxed mb-6`}>
                In a world increasingly dominated by mass production and fast fashion, we believe there's 
                something magical about products made by hand, with love, and with respect for our planet. 
                Our journey began with a simple mission: to celebrate and preserve India's incredible 
                artisanal traditions while promoting sustainable living.
              </p>
              
              <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} leading-relaxed mb-6`}>
                Every product in our collection tells a story – of skilled hands that shaped it, 
                of natural materials carefully sourced, and of communities that have kept these 
                traditions alive for centuries. From organic cotton kurtas woven in Rajasthan to 
                copper vessels crafted in Kerala, each item represents our commitment to authenticity 
                and quality.
              </p>
              
              <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} leading-relaxed`}>
                We work directly with artisans and small-scale producers across India, ensuring 
                fair wages and supporting sustainable livelihoods. When you choose House of Homegrown, 
                you're not just buying a product – you're supporting a movement towards conscious 
                consumption and cultural preservation.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className={`text-3xl font-bold text-center ${isDark ? 'text-white' : 'text-earth-brown'} mb-12`}>Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className={`p-6 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-earth-brown'} mb-3`}>{value.title}</h3>
                        <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'} leading-relaxed`}>{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className={`${isDark ? 'bg-black/30 border border-white/10' : 'bg-earth-sage/10 border border-earth-beige'} rounded-lg p-8 text-center`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>Join Our Mission</h2>
            <p className={`${isDark ? 'text-white/80' : 'text-earth-brown/80'} leading-relaxed max-w-2xl mx-auto`}>
              Together, we can create a more sustainable future while celebrating the incredible 
              craftsmanship that makes India unique. Every purchase you make helps preserve 
              traditional skills and supports artisan communities across the country.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;