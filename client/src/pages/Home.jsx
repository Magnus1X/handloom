import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setFeaturedProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const featuredCategories = [
    { name: 'Sarees', image: '/saree.png', link: '/category/clothing?subcategory=sarees' },
    { name: 'Kurtas', image: '/kurtas.png', link: '/category/clothing?subcategory=kurtas' },
    { name: 'Lehengas', image: '/lehnga.png', link: '/category/clothing?subcategory=lehengas' },
    { name: 'Jewelry', image: '/jewellery.png', link: '/category/jewelry' },
    { name: 'Spices', image: '/spices.png', link: '/category/indian-taste?subcategory=spices' },
    { name: 'Pottery', image: '/pottery.png', link: '/category/pottery' },
    { name: 'Textiles', image: '/textile.png', link: '/category/textiles' },
    { name: 'Tea', image: '/tea.png', link: '/category/indian-taste?subcategory=tea' },
  ];

  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-earth-sage" />,
      title: 'Sustainable',
      description: 'Eco-friendly products made with natural materials and traditional methods.'
    },
    {
      icon: <Heart className="h-8 w-8 text-earth-terracotta" />,
      title: 'Handcrafted',
      description: 'Each product is lovingly crafted by skilled artisans across India.'
    },
    {
      icon: <Users className="h-8 w-8 text-earth-brown" />,
      title: 'Community',
      description: 'Supporting local communities and preserving traditional crafts.'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Rangoli Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hero Section Patterns */}
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute top-32 left-16 w-20 h-20 opacity-25 animate-spin-slow"
        />
        <img 
          src="/pattern2.png" 
          alt="" 
          className="absolute top-32 right-16 w-20 h-20 opacity-25 animate-pulse"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute bottom-32 left-16 w-18 h-18 opacity-20 animate-float"
        />
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute bottom-32 right-16 w-18 h-18 opacity-20 animate-bounce-slow"
        />
      </div>
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src={isDark ? "/hero.png" : "/hero_light.png"}
            alt="House of Homegrown Hero"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-black/20' : 'bg-black/40'}`}></div>
        </div>
        {/* Hero Section Rangoli Patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="/pattern1.png" 
            alt="" 
            className="absolute top-20 left-20 w-24 h-24 opacity-60 animate-spin-slow"
          />
          <img 
            src="/pattern2.png" 
            alt="" 
            className="absolute top-20 right-20 w-24 h-24 opacity-60 animate-pulse"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight">
              Celebrating India's
              <span className="text-white block">Heritage & Craft</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/95 mb-6 md:mb-8 max-w-xl drop-shadow-xl leading-relaxed">
              Discover premium, sustainable products crafted by local artisans. 
              Every purchase supports traditional craftsmanship and sustainable living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-earth-terracotta hover:bg-earth-brown text-white shadow-lg w-full sm:w-auto">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${isDark ? 'bg-card' : 'bg-earth-cream/50'} relative overflow-hidden`}>
        {/* No patterns in Featured Categories section */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-foreground' : 'text-earth-brown'} mb-4`}>Featured Categories</h2>
            <p className={`body-font ${isDark ? 'text-muted-foreground' : 'text-earth-brown/70'}`}>Discover authentic Indian products</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 mb-6 md:mb-8">
            {featuredCategories.map((category) => (
              <Link key={category.name} to={category.link} className="group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`text-xs md:text-sm font-medium text-center ${isDark ? 'text-foreground group-hover:text-white' : 'text-earth-brown group-hover:text-earth-terracotta'} transition-colors leading-tight`}>
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/categories">
              <Button variant="outline" size="sm" className="body-font">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className={`py-16 ${isDark ? 'bg-secondary' : 'bg-earth-cream/50'} relative overflow-hidden`}>
        {/* No patterns in Featured Products section */}
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center ${isDark ? 'text-foreground' : 'text-earth-brown'} mb-12`}>Featured Products</h2>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className={`py-16 ${isDark ? 'bg-card' : 'bg-earth-cream/30'} relative overflow-hidden`}>
        {/* Decorative Rangoli Patterns - Symmetrical */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="/pattern3.png" 
            alt="" 
            className={`absolute top-8 left-8 w-12 h-12 ${isDark ? 'opacity-70' : 'opacity-15'} animate-spin-slow`}
          />
          <img 
            src="/pattern1.png" 
            alt="" 
            className={`absolute top-8 right-8 w-12 h-12 ${isDark ? 'opacity-70' : 'opacity-15'} animate-float`}
          />
          <img 
            src="/pattern2.png" 
            alt="" 
            className={`absolute bottom-8 left-8 w-12 h-12 ${isDark ? 'opacity-70' : 'opacity-15'} animate-pulse`}
          />
          <img 
            src="/pattern3.png" 
            alt="" 
            className={`absolute bottom-8 right-8 w-12 h-12 ${isDark ? 'opacity-70' : 'opacity-15'} animate-bounce-slow`}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className={`text-3xl font-bold text-center ${isDark ? 'text-foreground' : 'text-earth-brown'} mb-12`}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className={`text-center p-6 ${isDark ? 'bg-card border-border' : 'bg-white border-earth-beige'}`}>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-foreground' : 'text-earth-brown'} mb-3`}>{value.title}</h3>
                  <p className={`body-font ${isDark ? 'text-muted-foreground' : 'text-earth-brown/70'}`}>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;