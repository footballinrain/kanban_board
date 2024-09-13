// src/components/Board.jsx
import React, { useState, useEffect } from 'react';
import Task from './Task.jsx';
import './Board.css'; // Optional CSS file for styling

const Board = ({ grouping, sortOption }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const groupByStatus = (tasks) => {
    return tasks.reduce((groups, task) => {
      const group = groups[task.status] || [];
      group.push(task);
      groups[task.status] = group;
      return groups;
    }, {});
  };

  const groupByUser = (tasks) => {
    return tasks.reduce((groups, task) => {
      const group = groups[task.assignedUser] || [];
      group.push(task);
      groups[task.assignedUser] = group;
      return groups;
    }, {});
  };

  const groupByPriority = (tasks) => {
    return tasks.reduce((groups, task) => {
      const group = groups[task.priority] || [];
      group.push(task);
      groups[task.priority] = group;
      return groups;
    }, {});
  };

  const sortByPriority = (tasks) => {
    return [...tasks].sort((a, b) => b.priority - a.priority);
  };

  const sortByTitle = (tasks) => {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  };

  const getGroupedTasks = () => {
    let groupedTasks;

    if (grouping === 'status') {
      groupedTasks = groupByStatus(tasks);
    } else if (grouping === 'user') {
      groupedTasks = groupByUser(tasks);
    } else if (grouping === 'priority') {
      groupedTasks = groupByPriority(tasks);
    }

    // Apply sorting
    Object.keys(groupedTasks).forEach(group => {
      if (sortOption === 'priority') {
        groupedTasks[group] = sortByPriority(groupedTasks[group]);
      } else if (sortOption === 'title') {
        groupedTasks[group] = sortByTitle(groupedTasks[group]);
      }
    });

    return groupedTasks;
  };

  const groupedTasks = getGroupedTasks();

  return (
    <div className="board">
      {Object.keys(groupedTasks).map((group) => (
        <div key={group} className="group">
          <h3>{group}</h3>
          {groupedTasks[group].map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
