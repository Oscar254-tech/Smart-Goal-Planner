// Utility functions for goal calculations

export function calculateDaysLeft(deadline) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getGoalStatus(goal, daysLeft) {
  if (goal.savedAmount >= goal.targetAmount) return 'completed';
  if (daysLeft < 0) return 'overdue';
  if (daysLeft <= 30) return 'warning';
  return '';
}

export function calculateTotalSaved(goals) {
  return goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
}

export function calculateTotalTarget(goals) {
  return goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
}

export function getCompletedGoals(goals) {
  return goals.filter(goal => goal.savedAmount >= goal.targetAmount);
}

export function getUpcomingDeadlines(goals) {
  return goals
    .filter(goal => {
      const daysLeft = calculateDaysLeft(goal.deadline);
      return daysLeft <= 30 && goal.savedAmount < goal.targetAmount;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}

export function getOverdueGoals(goals) {
  return goals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft < 0 && goal.savedAmount < goal.targetAmount;
  });
}