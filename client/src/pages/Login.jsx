import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      login(response.data.user, response.data.token);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex items-center justify-center py-12 px-4 relative overflow-hidden`}>
      {/* Decorative Rangoli Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute top-16 left-16 w-26 h-26 opacity-78 animate-spin-slow"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute bottom-16 right-16 w-24 h-24 opacity-75 animate-pulse"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute top-1/2 left-8 w-20 h-20 opacity-70 animate-float"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute top-1/4 right-8 w-18 h-18 opacity-65 animate-bounce-slow"
        />
        <img 
          src="/pattern2.png" 
          alt="" 
          className="absolute bottom-1/4 right-12 w-16 h-16 opacity-60 animate-pulse"
        />
      </div>
      <Card className={`w-full max-w-md relative z-10 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'}`}>Welcome Back</CardTitle>
          <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
              Don't have an account?{' '}
              <Link to="/signup" className={`${isDark ? 'text-white hover:text-white/80' : 'text-earth-terracotta hover:underline'} font-medium`}>
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;