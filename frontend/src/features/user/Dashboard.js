import React, { useEffect, useState } from 'react';
import '../../styles.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // ensure user is logged in
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load dashboard');
        return res.json();
      })
      .then(data => {
        setUser(data.user);
        setOrders(data.orders);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!user) return <p>Unable to load dashboard.</p>;

  return (
    <div className="page user-dashboard">
      <h2 className="page-title">Welcome back, {user.name}!</h2>
      <p className="welcome-text">Here's a quick overview of your account.</p>

      {/* Profile Info */}
      <section className="dashboard-section profile-info">
        <h3>Profile Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        
        <button className="btn-secondary">Edit Profile</button>
      </section>

      {/* Order History */}
      <section className="dashboard-section order-history">
        <h3>Your Recent Orders</h3>
        {orders.length === 0 ? (
          <p>You have no recent orders.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td><button className="btn-primary btn-sm">View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="btn-primary">View All Orders</button>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="btn-primary">Shop New Products</button>
          <button className="btn-secondary">Manage Addresses</button>
          <button className="btn-secondary">Payment Methods</button>
          <button className="btn-secondary">Logout</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
