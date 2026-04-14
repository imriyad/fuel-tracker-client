import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import { useAuth } from './AuthContext';
import Vehicles from '../pages/Vehicles';
import FuelEntries from '../pages/FuelEntries';
import Statistics from '../pages/Statistics';
import AdminDashboard from '../pages/AdminDashboard';


// Public Only Guard (Login/Register)
const PublicOnly = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null;
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// Protected Route Guard
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Admin Only Guard
const AdminOnly = () => {
  const { isAdmin, loading } = useAuth();
  
  if (loading) return null;
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// Define routes
const router = createBrowserRouter([
  {
    element: <PublicOnly />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'vehicles',
            element: <Vehicles />,
          },
          {
            path: 'fuel-entries',
            element: <FuelEntries />,
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
        ],
      },
      {
        element: <AdminOnly />,
        children: [
          {
            path: 'admin',
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;