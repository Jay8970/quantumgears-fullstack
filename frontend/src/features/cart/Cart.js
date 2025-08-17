import React from 'react';
import { useNavigate } from 'react-router-dom';  // <-- import this
import '../../styles.css';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();  // <-- get navigate function

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="page cart-page">
      <h2 className="page-title">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>
                  <p>Subtotal: ${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <button className="btn-secondary" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <hr />
          <div className="cart-summary">
            <p className="total">Total: ${calculateTotal()}</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/checkout')}  // <-- add this
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
