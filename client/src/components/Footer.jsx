import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <footer className={`${isDark ? 'bg-background text-foreground border-t border-border' : 'bg-earth-brown text-earth-cream'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="House of Homegrown" className="w-8 h-8" />
              <span className="text-xl font-bold">House of Homegrown</span>
            </Link>
            <p className="text-white/70 mb-4 max-w-md">
              Celebrating India's rich heritage through sustainable, premium products crafted by local artisans. 
              Every purchase supports traditional craftsmanship and sustainable practices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className={`${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-earth-cream/80 hover:text-earth-cream'} transition-colors`}>Shop</Link></li>
              <li><Link to="/about" className={`${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-earth-cream/80 hover:text-earth-cream'} transition-colors`}>About Us</Link></li>
              <li><Link to="/contact" className={`${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-earth-cream/80 hover:text-earth-cream'} transition-colors`}>Contact</Link></li>
              <li><Link to="/faq" className={`${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-earth-cream/80 hover:text-earth-cream'} transition-colors`}>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className={`${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-earth-cream/80 hover:text-earth-cream'} transition-colors`}>Shipping & Returns</Link></li>
              <li><Link to="/privacy" className={`${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-earth-cream/80 hover:text-earth-cream'} transition-colors`}>Privacy Policy</Link></li>
              <li><Link to="/terms" className={`${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-earth-cream/80 hover:text-earth-cream'} transition-colors`}>Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${isDark ? 'border-border' : 'border-earth-cream/20'} mt-8 pt-8 text-center`}>
          <p className={`${isDark ? 'text-muted-foreground' : 'text-earth-cream/60'}`}>
            © 2026 House of Homegrown. All rights reserved. Made for sustainable living.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;