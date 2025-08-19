import React from 'react';
import ProgressBar from './ProgressBar';

function GoalCard({ goal, onEdit, onDelete, onDeposit }) {
  // Calculate days left until deadline
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft(goal.deadline);
  const progress = (goal.savedAmount / goal.targetAmount) * 100;

  // Determine goal status
  const getStatus = () => {
    if (goal.savedAmount >= goal.targetAmount) return 'completed';
    if (daysLeft < 0) return 'overdue';
    if (daysLeft <= 30) return 'warning';
    return '';
  };

  const status = getStatus();

  return (
    <div className={`goal-card ${status}`}>
      <h3>{goal.name}</h3>
      <div className="goal-details">
        <p><strong>Category:</strong> {goal.category}</p>
        <p><strong>Target:</strong> ${goal.targetAmount.toLocaleString()}</p>
        <p><strong>Saved:</strong> ${goal.savedAmount.toLocaleString()}</p>
        <p><strong>Remaining:</strong> ${(goal.targetAmount - goal.savedAmount).toLocaleString()}</p>
        <p><strong>Deadline:</strong> {goal.deadline} ({daysLeft} days left)</p>
      </div>
      
      <ProgressBar progress={progress} />
      
      {status === 'warning' && <p className="status-warning">Approaching deadline!</p>}
      {status === 'overdue' && <p className="status-overdue">Overdue!</p>}
      {status === 'completed' && <p className="status-completed">Completed!</p>}
      
      <div className="goal-actions">
        <button onClick={() => onDeposit(goal.id)}>Deposit</button>
        <button onClick={() => onEdit(goal)}>Edit</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;