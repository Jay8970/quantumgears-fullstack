import React, { useEffect, useState } from 'react';
import '../../styles.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete user');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditedName(user.name);
  };

  const handleSave = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: editedName }),
      });

      if (!res.ok) throw new Error('Failed to update user');

      setEditingUser(null);
      setEditedName('');
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditedName('');
  };

  return (
    <div className="page admin-users-page" style={{ maxWidth: 800, margin: 'auto', padding: '1rem' }}>
      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Manage Users</h2>

      {error && (
        <div style={{
          backgroundColor: '#ffe6e6',
          color: '#b00020',
          padding: '10px',
          borderRadius: 6,
          marginBottom: 20,
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading users...</p>
      ) : users.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No users found.</p>
      ) : (
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
                <td style={{ padding: '10px' }}>
                  {editingUser === user._id ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      style={{ padding: '6px', width: '90%' }}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td style={{ padding: '10px' }}>{user.email}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  {editingUser === user._id ? (
                    <>
                      <button
                        className="btn-primary"
                        style={{ marginRight: 6, padding: '6px 10px' }}
                        onClick={() => handleSave(user._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn-secondary"
                        style={{ padding: '6px 10px' }}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-secondary"
                        style={{ marginRight: 10, padding: '6px 12px' }}
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        style={{ padding: '6px 12px' }}
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
