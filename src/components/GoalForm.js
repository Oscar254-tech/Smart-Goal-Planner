import React, { useState, useEffect } from 'react';

function GoalForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        targetAmount: initialData.targetAmount,
        category: initialData.category,
        deadline: initialData.deadline
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      targetAmount: Number(formData.targetAmount)
    });
  };

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit}>
        <h3>{initialData ? 'Edit Goal' : 'Add New Goal'}</h3>
        
        <label>
          Goal Name:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <label>
          Target Amount ($):
          <input 
            type="number" 
            name="targetAmount" 
            value={formData.targetAmount} 
            onChange={handleChange} 
            min="1" 
            required 
          />
        </label>
        
        <label>
          Category:
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
          >
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
            <option value="Home">Home</option>
          </select>
        </label>
        
        <label>
          Deadline:
          <input 
            type="date" 
            name="deadline" 
            value={formData.deadline} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <div className="form-actions">
          <button type="submit">{initialData ? 'Update' : 'Add'} Goal</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default GoalForm;