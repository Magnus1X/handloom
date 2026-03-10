import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-earth-terracotta"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: '/admin' } }} replace />;
  }

  if (!user?.isAdmin) {
    // Logged-in but NOT admin → redirect home with no access
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
