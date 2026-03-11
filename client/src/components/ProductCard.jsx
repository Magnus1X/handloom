import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Check, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    toast.success(`${product.title} added to cart!`);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Link to={`/product/${product.id}`} className="h-full block">
      <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-card border-border h-full flex flex-col">
        <div className="aspect-[3/4] overflow-hidden bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-2 md:p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <Badge variant="secondary" className="text-xs px-1.5">
              {product.category}
            </Badge>
            {product.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-muted-foreground">{product.rating}</span>
              </div>
            )}
          </div>
          <h3 className="font-semibold text-xs md:text-sm lg:text-base mb-1 md:mb-2 line-clamp-2 text-card-foreground leading-tight">{product.title}</h3>
          <p className="text-xs text-muted-foreground mb-1 md:mb-3 line-clamp-2 hidden sm:block">{product.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm md:text-lg font-bold text-earth-terracotta">₹{product.price}</span>
            {product.stock && product.stock < 10 && (
              <span className="text-xs text-orange-600">Only {product.stock} left</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-2 md:p-4 pt-0" onClick={(e) => e.preventDefault()}>
          {isInCart ? (
            <div className="flex w-full space-x-2">
              <div className="flex items-center justify-between border border-border bg-background rounded-md px-1 flex-1 h-9">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-foreground hover:bg-secondary" onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(product.id, cartItem.quantity - 1); }}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-6 text-center text-foreground">{cartItem.quantity}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-foreground hover:bg-secondary" onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(product.id, cartItem.quantity + 1); }}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button size="sm" className="h-9 px-3 bg-earth-terracotta hover:bg-earth-brown text-white md:px-3 text-xs md:text-sm whitespace-nowrap hidden sm:flex" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/cart'); }}>
                Go to Cart
              </Button>
            </div>
          ) : (
            <Button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(e); }}
              className={`w-full transition-all duration-300 text-xs md:text-sm py-2 h-9 ${isAdded
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : ''
                }`}
              size="sm"
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;