import React, { useEffect, useState } from 'react';
import '../../styles.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update order status');
      fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page admin-orders-page" style={{ maxWidth: 1000, margin: 'auto', padding: '1rem' }}>
      <h2 className="page-title" style={{ marginBottom: '1rem', textAlign: 'center' }}>Manage Orders</h2>

      {error && (
        <div
          style={{
            backgroundColor: '#ffe6e6',
            color: '#b00020',
            padding: '10px 15px',
            borderRadius: 6,
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No orders found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            className="admin-table"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 0 10px rgb(0 0 0 / 0.05)',
            }}
          >
            <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>User</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Total ($)</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr
                  key={order._id}
                  style={{
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#fff',
                  }}
                >
                  <td style={{ padding: '10px' }}>{order._id}</td>
                  <td style={{ padding: '10px' }}>{order.user?.name || 'Unknown'}</td>
                  <td style={{ padding: '10px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>{order.total.toFixed(2)}</td>
                  <td
                    style={{
                      padding: '10px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color:
                        order.status === 'Pending'
                          ? '#d9534f'
                          : order.status === 'Shipped'
                          ? '#f0ad4e'
                          : order.status === 'Delivered'
                          ? '#5cb85c'
                          : '#777',
                    }}
                  >
                    {order.status}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order._id, e.target.value)}
                      style={{ padding: '6px', borderRadius: 4 }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
