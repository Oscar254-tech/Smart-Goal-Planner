import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoalList from './components/GoalList';
import Overview from './components/Overview';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:3000/goals');
      setGoals(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await axios.post('http://localhost:3000/goals', newGoal);
      setGoals([...goals, response.data]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const updateGoal = async (id, updatedGoal) => {
    try {
      await axios.put(`http://localhost:3000/goals/${id}`, updatedGoal);
      setGoals(goals.map(goal => goal.id === id ? updatedGoal : goal));
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/goals/${id}`);
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const makeDeposit = async (id, amount) => {
    try {
      const goalToUpdate = goals.find(goal => goal.id === id);
      const updatedGoal = {
        ...goalToUpdate,
        savedAmount: Number(goalToUpdate.savedAmount) + Number(amount)
      };
      await axios.patch(`http://localhost:3000/goals/${id}`, { savedAmount: updatedGoal.savedAmount });
      setGoals(goals.map(goal => goal.id === id ? updatedGoal : goal));
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <div className="dashboard">
        <Overview goals={goals} />
        <GoalList 
          goals={goals} 
          onAddGoal={addGoal} 
          onUpdateGoal={updateGoal} 
          onDeleteGoal={deleteGoal} 
          onMakeDeposit={makeDeposit} 
        />
      </div>
    </div>
  );
}

export default App;