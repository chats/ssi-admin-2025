import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'oidc-react';
import { Login } from './pages/Login';
import { LoggedOut } from './pages/LoggedOut';
import { MainLayout } from './layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthConfig } from './config/env.config';
//import LoginForm from './components/auth/LoginForm';




function App() {
  return (
    <AuthProvider {...AuthConfig}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logged-out" element={<LoggedOut />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;