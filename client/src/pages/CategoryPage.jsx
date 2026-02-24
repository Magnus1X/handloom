import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  
  const selectedSubcategory = searchParams.get('subcategory') || '';

  const subcategories = {
    clothing: [
      { name: 'Sarees', value: 'sarees' },
      { name: 'Kurtas', value: 'kurtas' },
      { name: 'Lehengas', value: 'lehengas' },
      { name: 'Fabrics', value: 'fabrics' }
    ],
    'indian-taste': [
      { name: 'Spices', value: 'spices' },
      { name: 'Tea', value: 'tea' },
      { name: 'Grains', value: 'grains' },
      { name: 'Pickles', value: 'pickles' },
      { name: 'Sweets', value: 'sweets' }
    ]
  };

  const categoryTitles = {
    clothing: 'Clothing & Fashion',
    'indian-taste': 'Indian Taste',
    sarees: 'Sarees',
    kurtas: 'Kurtas',
    lehengas: 'Lehengas',
    jewelry: 'Jewelry',
    spices: 'Spices',
    tea: 'Tea',
    pottery: 'Pottery',
    textiles: 'Textiles'
  };

  useEffect(() => {
    fetchProducts();
  }, [category, selectedSubcategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;
      
      if (selectedSubcategory) {
        // Filter by subcategory
        response = await productsAPI.getAll({ subcategory: selectedSubcategory });
      } else if (category === 'clothing') {
        // Show all clothing products
        response = await productsAPI.getAll({ category: 'clothing' });
      } else if (category === 'indian-taste') {
        // Show all home products (spices, tea, etc.)
        response = await productsAPI.getAll({ category: 'home' });
      } else {
        // Direct category filter (jewelry, pottery, etc.)
        response = await productsAPI.getAll({ subcategory: category });
      }
      
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    if (selectedSubcategory === subcategory) {
      setSearchParams({});
    } else {
      setSearchParams({ subcategory });
    }
  };

  const currentSubcategories = subcategories[category] || [];
  const categoryTitle = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} relative overflow-hidden`}>
      {/* Decorative Rangoli Patterns - Symmetrical Layout */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top corners - both pattern1 with same animation */}
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute top-16 left-16 w-16 h-16 opacity-15 animate-spin-slow"
        />
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute top-16 right-16 w-16 h-16 opacity-15 animate-spin-slow"
        />
        {/* Bottom corners - both pattern3 with same animation */}
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute bottom-16 left-16 w-14 h-14 opacity-12 animate-float"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute bottom-16 right-16 w-14 h-14 opacity-12 animate-float"
        />
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-foreground' : 'text-earth-brown'} mb-4`}>
            {categoryTitle}
          </h1>
          <p className={`text-xl ${isDark ? 'text-muted-foreground' : 'text-earth-brown/70'}`}>
            Discover authentic Indian products
          </p>
        </div>

        {currentSubcategories.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-foreground' : 'text-earth-brown'} mb-6 text-center`}>
              Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {currentSubcategories.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => handleSubcategoryClick(sub.value)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedSubcategory === sub.value
                      ? 'bg-earth-terracotta text-white'
                      : isDark
                      ? 'bg-card text-card-foreground hover:bg-secondary border border-border'
                      : 'bg-white text-earth-brown hover:bg-earth-cream border border-earth-beige'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-foreground' : 'text-earth-brown'} mb-6`}>
            {selectedSubcategory 
              ? `${currentSubcategories.find(s => s.value === selectedSubcategory)?.name || selectedSubcategory} Products`
              : `${categoryTitle} Products`
            }
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className={`${isDark ? 'bg-muted' : 'bg-gray-200'} aspect-square rounded-lg mb-4`}></div>
                  <div className={`h-4 ${isDark ? 'bg-muted' : 'bg-gray-200'} rounded mb-2`}></div>
                  <div className={`h-4 ${isDark ? 'bg-muted' : 'bg-gray-200'} rounded w-2/3`}></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${isDark ? 'text-muted-foreground' : 'text-earth-brown/70'}`}>
                No products found in this category.
              </p>
              <Link 
                to="/shop" 
                className="inline-block mt-4 px-6 py-2 bg-earth-terracotta text-white rounded-lg hover:bg-earth-brown transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;