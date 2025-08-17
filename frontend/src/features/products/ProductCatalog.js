import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import '../../styles.css';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Failed to fetch products: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  // Get quantity of a product in the cart
  const getQtyInCart = (productId) => {
    const item = cartItems.find(i => i._id === productId);
    return item ? item.qty : 0;
  };

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filtered products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || product.category === selectedCategory)
  );

  return (
    <div className="page">
      <h2 className="page-title">Product Catalog</h2>

      {/* Search and Filter Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 250px',
            padding: '0.8rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            flex: '0 0 200px',
            padding: '0.8rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products match your search or filter.</p>
        ) : (
          filteredProducts.map(product => {
            const qtyInCart = getQtyInCart(product._id);
            return (
              <div key={product._id} className="product-card">
                <Link
                  to={`/products/${product._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img
                    src={product.image ? `/assets/${product.image}` : 'https://via.placeholder.com/150?text=No+Image'}
                    alt={product.name}
                    className="product-image"
                    onError={e => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                  />
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </Link>

                {qtyInCart === 0 ? (
                  <button
                    className="btn-primary"
                    onClick={() => {
                      addToCart(product);
                      navigate('/cart');
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(product._id)}>-</button>
                    <span>{qtyInCart}</span>
                    <button onClick={() => increaseQty(product._id)}>+</button>
                  </div>
                )}

                <Link to={`/products/${product._id}`}>
                  <button className="btn-secondary" style={{ marginTop: '0.5rem' }}>
                    View Details
                  </button>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
