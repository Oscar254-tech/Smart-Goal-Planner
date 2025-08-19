import React, { useState } from 'react';
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';
import DepositForm from './DepositForm';

function GoalList({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, onMakeDeposit }) {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showDepositForm, setShowDepositForm] = useState(null);

  const handleSubmit = (goalData) => {
    if (editingGoal) {
      onUpdateGoal(editingGoal.id, { ...editingGoal, ...goalData });
      setEditingGoal(null);
    } else {
      onAddGoal({
        ...goalData,
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      });
    }
    setShowForm(false);
  };

  return (
    <div className="goal-list">
      <h2>My Savings Goals</h2>
      <button onClick={() => setShowForm(true)}>Add New Goal</button>
      
      {showForm && (
        <GoalForm 
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
          initialData={editingGoal} 
        />
      )}
      
      <div className="goals-container">
        {goals.map(goal => (
          <div key={goal.id} className="goal-item">
            <GoalCard 
              goal={goal} 
              onEdit={() => {
                setEditingGoal(goal);
                setShowForm(true);
              }} 
              onDelete={() => onDeleteGoal(goal.id)} 
              onDeposit={() => setShowDepositForm(goal.id)} 
            />
            
            {showDepositForm === goal.id && (
              <DepositForm 
                onDeposit={(amount) => {
                  onMakeDeposit(goal.id, amount);
                  setShowDepositForm(null);
                }} 
                onCancel={() => setShowDepositForm(null)} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalList;