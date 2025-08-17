import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { useCart } from '../cart/CartContext'; // Adjust path if needed
import '../../styles.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const cartItem = cartItems.find(item => item._id === product._id);
  const qtyInCart = cartItem ? cartItem.qty : 0;

  return (
    <div className="page product-detail">
      <h2 className="page-title">{product.name}</h2>
      <img
        src={product.image ? `/assets/${product.image}` : 'https://via.placeholder.com/400?text=No+Image'}
        alt={product.name}
        className="detail-image"
        onError={e => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
      />
      <p className="product-description">{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>

      {qtyInCart === 0 ? (
        <button className="btn-primary" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      ) : (
        <div className="qty-controls">
          <button onClick={() => decreaseQty(product._id)}>-</button>
          <span>{qtyInCart}</span>
          <button onClick={() => increaseQty(product._id)}>+</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
