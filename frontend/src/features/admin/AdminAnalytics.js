import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../../styles.css';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const statusColors = {
    Pending: '#ffc107',
    Shipped: '#17a2b8',
    Delivered: '#28a745',
    Cancelled: '#dc3545',
  };

  return (
    <div className="page admin-analytics-page" style={{ maxWidth: 1000, margin: 'auto', padding: '2rem' }}>
      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>📊 Analytics Overview</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading analytics...</p>
      ) : analytics ? (
        <>
          {/* Summary Cards */}
          <div
            className="analytics-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div className="card" style={cardStyle}>
              <h3 style={cardTitle}>👤 Total Users</h3>
              <p style={cardValue}>{analytics.totalUsers}</p>
            </div>
            <div className="card" style={cardStyle}>
              <h3 style={cardTitle}>🧾 Total Orders</h3>
              <p style={cardValue}>{analytics.totalOrders}</p>
            </div>
            <div className="card" style={cardStyle}>
              <h3 style={cardTitle}>💰 Total Revenue</h3>
              <p style={cardValue}>${analytics.totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          {/* Orders by Status */}
          <div className="card" style={{ ...cardStyle, padding: '1.5rem' }}>
            <h3 style={{ ...cardTitle, marginBottom: '1rem' }}>📦 Orders by Status</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {Object.entries(analytics.ordersByStatus).map(([status, count]) => (
                <li
                  key={status}
                  style={{
                    marginBottom: '0.5rem',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: statusColors[status] || '#555',
                  }}
                >
                  {status}: {count}
                </li>
              ))}
            </ul>
          </div>

          {/* Optional Chart */}
          <div className="card" style={{ ...cardStyle, marginTop: '2rem' }}>
            <h3 style={cardTitle}>📈 Orders by Status (Chart)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={Object.entries(analytics.ordersByStatus).map(([status, count]) => ({
                  status,
                  count,
                }))}
              >
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#007bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : null}
    </div>
  );
};

// 💅 Reusable style objects
const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  padding: '1.25rem',
  textAlign: 'center',
};

const cardTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '#333',
};

const cardValue = {
  fontSize: '28px',
  fontWeight: 600,
  color: '#007bff',
};

export default AdminAnalytics;
