import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Categories = () => {
  const { isDark } = useTheme();

  const categoryRows = [
    {
      title: 'Clothing & Fashion',
      categories: [
        { name: 'Sarees', image: '/saree.png', link: '/category/clothing?subcategory=sarees' },
        { name: 'Kurtas', image: '/kurtas.png', link: '/category/clothing?subcategory=kurtas' },
        { name: 'Lehengas', image: '/lehnga.png', link: '/category/clothing?subcategory=lehengas' },
        { name: 'Jewelry', image: '/jewellery.png', link: '/category/jewelry' },
        { name: 'Footwear', image: '/footwear.png', link: '/category/footwear' },
        { name: 'Accessories', image: '/accessories.png', link: '/category/accessories' },
        { name: 'Fabrics', image: '/fabric.png', link: '/category/clothing?subcategory=fabrics' },
        { name: 'Bags', image: '/bags.png', link: '/category/bags' }
      ]
    },
    {
      title: 'Food & Spices',
      categories: [
        { name: 'Spices', image: '/spices.png', link: '/category/indian-taste?subcategory=spices' },
        { name: 'Tea', image: '/tea.png', link: '/category/indian-taste?subcategory=tea' },
        { name: 'Grains', image: '/grains.png', link: '/category/indian-taste?subcategory=grains' },
        { name: 'Pickles', image: '/pickles.png', link: '/category/indian-taste?subcategory=pickles' },
        { name: 'Ghee & Oils', image: '/ghee and oil.png', link: '/category/oils' },
        { name: 'Honey', image: '/honey.png', link: '/category/honey' },
        { name: 'Dry Fruits', image: '/dry fruits.png', link: '/category/dryfruits' },
        { name: 'Sweets', image: '/sweets.png', link: '/category/indian-taste?subcategory=sweets' }
      ]
    },
    {
      title: 'Home & Living',
      categories: [
        { name: 'Pottery', image: '/pottery.png', link: '/category/pottery' },
        { name: 'Textiles', image: '/textile.png', link: '/category/textiles' },
        { name: 'Furniture', image: '/furniture.png', link: '/category/furniture' },
        { name: 'Kitchenware', image: '/kitchenware.png', link: '/category/kitchenware' },
        { name: 'Decor', image: '/decor.png', link: '/category/decor' },
        { name: 'Lighting', image: '/lighting.png', link: '/category/lighting' },
        { name: 'Storage', image: '/storage.png', link: '/category/storage' },
        { name: 'Carpets', image: '/carpet.png', link: '/category/carpets' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} relative overflow-hidden`}>
      {/* Decorative Rangoli Patterns - Symmetrical Layout */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top corners - both pattern1 with same animation */}
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute top-20 left-20 w-14 h-14 opacity-12 animate-spin-slow"
        />
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute top-20 right-20 w-14 h-14 opacity-12 animate-spin-slow"
        />
        {/* Bottom corners - both pattern3 with same animation */}
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute bottom-20 left-20 w-10 h-10 opacity-8 animate-float"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute bottom-20 right-20 w-10 h-10 opacity-8 animate-float"
        />
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>
            Explore Indian Heritage
          </h1>
          <p className={`text-base md:text-xl ${isDark ? 'text-white/70' : 'text-earth-brown/70'} max-w-3xl mx-auto px-4`}>
            Discover authentic Indian products celebrating "Roti, Kapda aur Makan" - the essence of Indian living.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {categoryRows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-6 md:mb-8 text-center`}>
                {row.title}
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
                {row.categories.map((category, index) => (
                  <Link key={index} to={category.link} className="group">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={`text-xs md:text-sm font-medium text-center ${isDark ? 'text-white/80 group-hover:text-white' : 'text-earth-brown group-hover:text-earth-terracotta'} transition-colors leading-tight`}>
                        {category.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;