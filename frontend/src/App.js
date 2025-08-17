import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import ProductCatalog from './features/products/ProductCatalog';
import ProductDetail from './features/products/ProductDetail';
import Cart from './features/cart/Cart';
import Checkout from './features/cart/Checkout';
import Dashboard from './features/user/Dashboard';
import AdminDashboard from './features/admin/AdminDashboard';
import AdminProducts from './features/admin/AdminProducts';
import AdminOrders from './features/admin/AdminOrders';
import AdminUsers from './features/admin/AdminUsers';
import AdminAnalytics from './features/admin/AdminAnalytics';

import { AuthProvider } from './features/auth/AuthContext';
import PrivateRoute from './features/auth/PrivateRoute';
// (Optional) If you're doing role-based admin auth
// import AdminRoute from './features/auth/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path='/products'
            element={
              <PrivateRoute>
                <ProductCatalog />
              </PrivateRoute>
            }
          />
          <Route
            path='/products/:id'
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path='/cart'
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path='/checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Admin Routes (wrap in PrivateRoute or AdminRoute as needed) */}
          <Route
            path='/admin'
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/products'
            element={
              <PrivateRoute>
                <AdminProducts />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/orders'
            element={
              <PrivateRoute>
                <AdminOrders />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/users'
            element={
              <PrivateRoute>
                <AdminUsers />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/analytics'
            element={
              <PrivateRoute>
                <AdminAnalytics />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
