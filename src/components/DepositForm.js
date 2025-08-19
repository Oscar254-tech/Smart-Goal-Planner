import React, { useState } from 'react';

function DepositForm({ onDeposit, onCancel }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && Number(amount) > 0) {
      onDeposit(amount);
    }
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit}>
        <h3>Make a Deposit</h3>
        
        <label>
          Amount ($):
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            min="0.01" 
            step="0.01" 
            required 
          />
        </label>
        
        <div className="form-actions">
          <button type="submit">Deposit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DepositForm;