import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';


// Lazy load components
const Login = lazy(() => import('../pages/Login'));
const LoggedOut = lazy(() => import('../pages/LoggedOut'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Settings = lazy(() => import('../pages/Settings'));
const MainLayout = lazy(() => import('../layouts/MainLayout'));

// Route configurations
const publicRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/logged-out',
    component: LoggedOut,
  },
];

const privateRoutes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/settings',
    component: Settings,
  },
];

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
            />
          ))}
          
          {/* Private Routes */}
          {privateRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute>
                  <MainLayout>
                    <Component />
                  </MainLayout>
                </PrivateRoute>
              }
            />
          ))}
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;