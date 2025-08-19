import React from 'react';
import { calculateDaysLeft, getGoalStatus } from '../utils/goalUtils';

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  const upcomingDeadlines = goals
    .filter(goal => {
      const daysLeft = calculateDaysLeft(goal.deadline);
      return daysLeft <= 30 && goal.savedAmount < goal.targetAmount;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const overdueGoals = goals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft < 0 && goal.savedAmount < goal.targetAmount;
  });

  return (
    <div className="overview">
      <h2>Overview</h2>
      
      <div className="stats">
        <div className="stat-item">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        
        <div className="stat-item">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="stat-item">
          <h3>Completed Goals</h3>
          <p>{completedGoals}</p>
        </div>
        
        <div className="stat-item">
          <h3>Progress</h3>
          <p>{Math.round((totalSaved / totalTarget) * 100)}% of total target</p>
        </div>
      </div>
      
      {upcomingDeadlines.length > 0 && (
        <div className="upcoming-deadlines">
          <h3>Upcoming Deadlines (within 30 days)</h3>
          <ul>
            {upcomingDeadlines.map(goal => (
              <li key={goal.id}>
                {goal.name} - {calculateDaysLeft(goal.deadline)} days left (${goal.targetAmount - goal.savedAmount} remaining)
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {overdueGoals.length > 0 && (
        <div className="overdue-goals">
          <h3>Overdue Goals</h3>
          <ul>
            {overdueGoals.map(goal => (
              <li key={goal.id}>
                {goal.name} - ${goal.targetAmount - goal.savedAmount} remaining
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Overview;