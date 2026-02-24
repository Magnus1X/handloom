import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { productsAPI } from '../utils/api';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    {
      label: 'Indian Taste',
      dropdown: [
        { to: '/category/indian-taste?subcategory=spices', label: 'Spices & Masalas' },
        { to: '/category/indian-taste?subcategory=tea', label: 'Tea & Beverages' },
        { to: '/category/indian-taste?subcategory=grains', label: 'Organic Grains' },
        { to: '/category/indian-taste?subcategory=pickles', label: 'Pickles & Preserves' },
        { to: '/category/indian-taste?subcategory=sweets', label: 'Traditional Sweets' }
      ]
    },
    {
      label: 'Clothing',
      dropdown: [
        { to: '/category/clothing?subcategory=sarees', label: 'Sarees' },
        { to: '/category/clothing?subcategory=kurtas', label: 'Kurtas & Kurtis' },
        { to: '/category/clothing?subcategory=lehengas', label: 'Lehengas' },
        { to: '/category/clothing?subcategory=fabrics', label: 'Fabrics' }
      ]
    }
  ];

  return (
    <header className={`${isDark ? 'bg-black/90' : 'bg-earth-cream'} backdrop-blur-sm border-b ${isDark ? 'border-white/10' : 'border-earth-beige'} sticky top-0 z-40`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="House of Homegrown" className="w-12 h-12" />
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'}`}>House of Homegrown</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              link.dropdown ? (
                <div key={index} className="relative group">
                  <button className={`${isDark ? 'text-white/80 hover:text-white' : 'text-earth-brown hover:text-earth-terracotta'} transition-colors flex items-center h-10`}>
                    {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className={`absolute top-full left-0 mt-2 w-48 ${isDark ? 'bg-black/95 border-white/10' : 'bg-white border-earth-beige'} rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
                    {link.dropdown.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.to}
                        className={`block px-4 py-2 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'} transition-colors`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  className={`${isDark ? 'text-white/80 hover:text-white' : 'text-earth-brown hover:text-earth-terracotta'} transition-colors flex items-center h-10`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="relative group">
              <Link to="/categories" className={`${isDark ? 'text-white/80 hover:text-white' : 'text-earth-brown hover:text-earth-terracotta'} transition-colors flex items-center h-10`}>
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <div className={`absolute top-full left-0 mt-2 w-48 ${isDark ? 'bg-black/95 border-white/10' : 'bg-white border-earth-beige'} rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/shop?category=${category}`}
                    className={`block px-4 py-2 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'} transition-colors capitalize`}
                  >
                    {category}
                  </Link>
                ))}
                <Link
                  to="/categories"
                  className={`block px-4 py-2 border-t ${isDark ? 'border-white/10 text-white/80 hover:text-white hover:bg-white/10' : 'border-earth-beige text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'} transition-colors font-medium`}
                >
                  View All Categories
                </Link>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-64 pr-10 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60' : 'bg-white border-earth-beige text-earth-brown placeholder:text-earth-brown/60'}`}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-earth-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>
                <div className="hidden md:block relative group">
                  <button className={`${isDark ? 'text-white/80 hover:text-white' : 'text-earth-brown hover:text-earth-terracotta'} transition-colors flex items-center h-10`}>
                    <User className="h-5 w-5 mr-1" />
                    Hi {user?.name || 'User'} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className={`absolute top-full right-0 mt-2 w-48 ${isDark ? 'bg-black/95 border-white/10' : 'bg-white border-earth-beige'} rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'} transition-colors`}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className={`block px-4 py-2 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'} transition-colors`}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className={`block w-full text-left px-4 py-2 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'} transition-colors`}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-earth-brown hover:text-earth-terracotta hover:bg-earth-cream'}`}>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-earth-terracotta hover:bg-earth-brown">Sign Up</Button>
                </Link>
              </div>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <form onSubmit={handleSearch} className="md:hidden">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                  
                  {navLinks.map((link, index) => (
                    link.dropdown ? (
                      <div key={index}>
                        <p className="text-earth-brown font-semibold py-2">{link.label}</p>
                        {link.dropdown.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.to}
                            className="text-earth-brown/80 hover:text-earth-terracotta transition-colors py-1 pl-4 block"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={index}
                        to={link.to}
                        className="text-earth-brown hover:text-earth-terracotta transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                  
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="text-earth-brown hover:text-earth-terracotta transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="text-earth-brown hover:text-earth-terracotta transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <Button
                        variant="ghost"
                        className="justify-start p-0 h-auto text-earth-brown hover:text-earth-terracotta"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">Login</Button>
                      </Link>
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;