import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleManageProducts = () => {
    navigate('/admin/products');
  };

  const handleViewOrders = () => {
    navigate('/admin/orders');
  };

  const handleManageUsers = () => {
    navigate('/admin/users');
  };

  const handleViewAnalytics = () => {
    navigate('/admin/analytics');
  };

  return (
    <div className="page admin-dashboard">
      <h2 className="page-title">Admin Panel</h2>

      <div className="admin-actions">
        <div className="admin-card">
          <h3>Manage Products</h3>
          <p>Add, edit, or remove products from your catalog.</p>
          <button className="btn-primary" onClick={handleManageProducts}>Go to Products</button>
        </div>

        <div className="admin-card">
          <h3>View Orders</h3>
          <p>Track, update, and fulfill customer orders.</p>
          <button className="btn-primary" onClick={handleViewOrders}>Go to Orders</button>
        </div>

        <div className="admin-card">
          <h3>Manage Users</h3>
          <p>View and manage registered users and permissions.</p>
          <button className="btn-primary" onClick={handleManageUsers}>Go to Users</button>
        </div>

        <div className="admin-card">
          <h3>Analytics</h3>
          <p>View sales reports, user activity, and system stats.</p>
          <button className="btn-primary" onClick={handleViewAnalytics}>View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
