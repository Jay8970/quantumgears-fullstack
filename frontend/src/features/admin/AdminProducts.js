import React, { useEffect, useState } from 'react';
import '../../styles.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.price) {
      setError('Name and price are required');
      return;
    }
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/products/${editingId}` : '/api/products';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          image: form.image
        })
      });

      if (!res.ok) throw new Error('Failed to save product');

      setForm({ name: '', description: '', price: '', category: '', image: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = product => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category || '',
      image: product.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page admin-products-page" style={{ maxWidth: 960, margin: 'auto', padding: '1rem' }}>
      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {editingId ? 'Edit Product' : 'Add New Product'}
      </h2>

      {error && (
        <div style={{ backgroundColor: '#ffe6e6', color: '#b00020', padding: '10px 15px', borderRadius: 6, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <form
        className="form"
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2rem',
          backgroundColor: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)'
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name*"
          value={form.name}
          onChange={handleChange}
          required
          style={{ gridColumn: 'span 2', padding: '10px', fontSize: '1rem' }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          style={{ gridColumn: 'span 2', padding: '10px', fontSize: '1rem', resize: 'vertical' }}
        />

        <input
          type="number"
          name="price"
          placeholder="Price*"
          value={form.price}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          style={{ padding: '10px', fontSize: '1rem' }}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={{ padding: '10px', fontSize: '1rem' }}
        />

        <input
          type="text"
          name="image"
          placeholder="Image filename or URL (optional)"
          value={form.image}
          onChange={handleChange}
          style={{ gridColumn: 'span 2', padding: '10px', fontSize: '1rem' }}
        />

        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditingId(null);
                setForm({ name: '', description: '', price: '', category: '', image: '' });
                setError('');
              }}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
        Existing Products
      </h3>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            className="admin-table"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 0 10px rgb(0 0 0 / 0.05)'
            }}
          >
            <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Price ($)</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr
                  key={p._id}
                  style={{
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#fff',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
                >
                  <td style={{ padding: '10px' }}>{p.name}</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>{p.price.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>{p.category || '-'}</td>
                  <td style={{ padding: '10px' }}>{p.image || '-'}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      className="btn-secondary"
                      onClick={() => handleEdit(p)}
                      style={{ marginRight: 8, padding: '6px 12px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(p._id)}
                      style={{ padding: '6px 12px', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
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

export default AdminProducts;
