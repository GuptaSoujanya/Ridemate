import React, { useState } from 'react';
import '../styles/Payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber && expiryDate && cvv) {
      setMessage('Payment successful!');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            maxLength="16"
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength="3"
            required
          />
        </div>
        <button type="submit" className="submit-button">Pay Now</button>
      </form>
      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default Payment;
