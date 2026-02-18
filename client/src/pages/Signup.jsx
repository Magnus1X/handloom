import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../utils/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await authAPI.signup(signupData);
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex items-center justify-center py-12 px-4 relative overflow-hidden`}>
      {/* Decorative Rangoli Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="/pattern2.png" 
          alt="" 
          className="absolute top-16 right-16 w-26 h-26 opacity-78 animate-spin-slow"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute bottom-16 left-16 w-24 h-24 opacity-75 animate-pulse"
        />
        <img 
          src="/pattern1.png" 
          alt="" 
          className="absolute top-1/2 right-8 w-20 h-20 opacity-70 animate-float"
        />
        <img 
          src="/pattern3.png" 
          alt="" 
          className="absolute top-1/4 left-8 w-18 h-18 opacity-65 animate-bounce-slow"
        />
        <img 
          src="/pattern2.png" 
          alt="" 
          className="absolute bottom-1/4 left-12 w-16 h-16 opacity-60 animate-pulse"
        />
      </div>
      <Card className={`w-full max-w-md relative z-10 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-earth-beige'}`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'}`}>Create Account</CardTitle>
          <p className={`${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>Join our sustainable community</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

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
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-earth-brown'} mb-1`}>
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
              Already have an account?{' '}
              <Link to="/login" className={`${isDark ? 'text-white hover:text-white/80' : 'text-earth-terracotta hover:underline'} font-medium`}>
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;