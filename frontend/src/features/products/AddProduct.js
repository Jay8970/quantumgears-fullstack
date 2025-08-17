import React, { useState } from 'react';
import '../../styles.css';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert('Product added!');
        setForm({ name: '', description: '', price: '', category: '', stock: '' });
      } else {
        const err = await res.json();
        alert(err.message || 'Error adding product');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="page form-page">
      <h2>Add New Product</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
        <button type="submit" className="btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
