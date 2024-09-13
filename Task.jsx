// src/components/Task.jsx
import React from 'react';
import './Task.css'; // Optional CSS file for styling

const Task = ({ task }) => {
  return (
    <div className="task">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Assigned to: {task.assignedUser}</p>
    </div>
  );
};

export default Task;
