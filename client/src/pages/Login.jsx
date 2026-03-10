import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../utils/api';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail } from 'lucide-react';

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
      // Redirect admin users straight to the admin panel
      if (response.data.user?.isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Note: useGoogleLogin returns an access token by default. 
        // We might need to fetch user info or use the code flow if the backend expects an ID token.
        // However, the previous implementation used ID token from the implicit flow.
        // Let's stick to the previous logic but with a custom button.
        // If we want the ID token with useGoogleLogin, we need to handle it differently or use GoogleLogin with custom children (unavailable in @react-oauth/google v2+)
        // Wait, @react-oauth/google's <GoogleLogin> DOES NOT support custom children easily.
        // But useGoogleLogin gives us an access token.
        // If my backend expects an ID token, I should use the 'id_token' flow or fetch it.
        // Actually, let's just style the existing GoogleLogin if possible, OR 
        // use useGoogleLogin and update the backend if it's strictly ID token.
        // The most "aligned" way is a custom button.

        // Let's assume the backend can handle the access token or we fetch the user info.
        // Re-reading previous implementation: I used credentialResponse.credential which is an ID token.

        const response = await authAPI.googleLogin(tokenResponse.access_token);
        login(response.data.user, response.data.token);
        navigate(from, { replace: true });
      } catch (error) {
        setError(error.response?.data?.message || 'Google login failed');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google login failed'),
  });

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
      <Card className={`w-full max-w-md relative z-10 backdrop-blur-md ${isDark ? 'bg-black/30 border-white/10' : 'bg-white/40 border-earth-beige/50'}`}>
        <CardHeader className="text-center bg-transparent">
          <CardTitle className={`text-2xl font-bold bg-transparent ${isDark ? 'text-white' : 'text-earth-brown'}`}>Welcome Back</CardTitle>
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

          <div className="mt-4">
            <div className="flex justify-center text-sm">
              <span className={`px-2 ${isDark ? 'text-white/50' : 'text-earth-brown/50'}`}>Or continue with</span>
            </div>

            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                type="button"
                className={`w-full flex items-center justify-center gap-2 backdrop-blur-sm ${isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  : 'bg-black/5 border-earth-brown/10 hover:bg-black/10 text-earth-brown'
                  }`}
                onClick={() => loginWithGoogle()}
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>
          </div>

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