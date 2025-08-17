import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cart/CartContext'; // adjust path if needed
import '../../styles.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Basic validation function (unchanged)
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\+?\d{7,15}$/))
      newErrors.phone = 'Valid phone number is required';
    if (!formData.shippingAddress.trim())
      newErrors.shippingAddress = 'Shipping address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (
      !formData.cardNumber
        .replace(/\s+/g, '')
        .match(/^\d{13,19}$/)
    )
      newErrors.cardNumber = 'Card number must be 13-19 digits';
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/))
      newErrors.expiryDate = 'Expiry date must be MM/YY';
    if (!formData.cvv.match(/^\d{3,4}$/))
      newErrors.cvv = 'CVV must be 3 or 4 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!cartItems.length) {
      alert('Your cart is empty.');
      return;
    }

    if (validate()) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');

        const orderData = {
          products: cartItems.map(item => ({
            product: item._id,  // assuming _id is product ID
            quantity: item.qty,
          })),
          total: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
          shippingAddress: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.shippingAddress,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          paymentInfo: {
            cardName: formData.cardName,
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
          },
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(errMsg || 'Failed to place order');
        }

        const data = await res.json();

        alert('Order placed successfully!');
        clearCart();
        navigate('/'); // or navigate to order confirmation page
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="page form-page">
      <h2 className="page-title">Checkout</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        {/* Customer Info */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className={errors.fullName ? 'error' : ''}
          required
          autoComplete="name"
        />
        {errors.fullName && <small className="error-text">{errors.fullName}</small>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          required
          autoComplete="email"
        />
        {errors.email && <small className="error-text">{errors.email}</small>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (e.g. +1234567890)"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
          required
          autoComplete="tel"
          pattern="^\+?\d{7,15}$"
          inputMode="tel"
        />
        {errors.phone && <small className="error-text">{errors.phone}</small>}

        {/* Shipping Address */}
        <input
          type="text"
          name="shippingAddress"
          placeholder="Shipping Address"
          value={formData.shippingAddress}
          onChange={handleChange}
          className={errors.shippingAddress ? 'error' : ''}
          required
          autoComplete="street-address"
        />
        {errors.shippingAddress && <small className="error-text">{errors.shippingAddress}</small>}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className={errors.city ? 'error' : ''}
          required
          autoComplete="address-level2"
        />
        {errors.city && <small className="error-text">{errors.city}</small>}

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          className={errors.postalCode ? 'error' : ''}
          required
          autoComplete="postal-code"
        />
        {errors.postalCode && <small className="error-text">{errors.postalCode}</small>}

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className={errors.country ? 'error' : ''}
          required
          autoComplete="country-name"
        />
        {errors.country && <small className="error-text">{errors.country}</small>}

        {/* Payment Info */}
        <input
          type="text"
          name="cardName"
          placeholder="Name on Card"
          value={formData.cardName}
          onChange={handleChange}
          className={errors.cardName ? 'error' : ''}
          required
          autoComplete="cc-name"
        />
        {errors.cardName && <small className="error-text">{errors.cardName}</small>}

        <input
          type="text"
          name="cardNumber"
          placeholder="Credit Card Number (numbers only)"
          value={formData.cardNumber}
          onChange={handleChange}
          maxLength={19}
          className={errors.cardNumber ? 'error' : ''}
          required
          inputMode="numeric"
          autoComplete="cc-number"
          pattern="[0-9\s]{13,19}"
        />
        {errors.cardNumber && <small className="error-text">{errors.cardNumber}</small>}

        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={formData.expiryDate}
          onChange={handleChange}
          maxLength={5}
          className={errors.expiryDate ? 'error' : ''}
          required
          autoComplete="cc-exp"
          pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
        />
        {errors.expiryDate && <small className="error-text">{errors.expiryDate}</small>}

        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={formData.cvv}
          onChange={handleChange}
          maxLength={4}
          className={errors.cvv ? 'error' : ''}
          required
          autoComplete="cc-csc"
          pattern="\d{3,4}"
          inputMode="numeric"
        />
        {errors.cvv && <small className="error-text">{errors.cvv}</small>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
