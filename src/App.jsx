import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Load todos from localStorage, or initialize with an empty array
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  // State to hold the list of todos
  const [todos, setTodos] = useState(loadTodos());
  // State to hold the current input value
  const [input, setInput] = useState('');
  // State for editing a specific todo
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Update localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Handle adding or updating a todo
  const handleAddOrEditTodo = () => {
    if (input.trim() === '' && editingText.trim() === '') return;

    if (editingIndex !== null) {
      // Edit the existing todo
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? { ...todo, text: editingText } : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditingText('');
    } else {
      // Add a new todo
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  // Handle toggling the completion status of a todo
  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Handle deleting a todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Handle clearing all completed todos
  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    setTodos(activeTodos);
  };

  // Handle marking all todos as completed
  const markAllCompleted = () => {
    const allCompletedTodos = todos.map(todo => ({ ...todo, completed: true }));
    setTodos(allCompletedTodos);
  };

  // Handle editing a todo
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  return (
    <div className="App">
      <h1 className="app-title">My To-Do List</h1>

      {/* Input field for new todos */}
      <div className="todo-input">
        <input
          type="text"
          placeholder={editingIndex !== null ? 'Edit your task' : 'Add a new task'}
          value={editingIndex !== null ? editingText : input}
          onChange={(e) => (editingIndex !== null ? setEditingText(e.target.value) : setInput(e.target.value))}
        />
        <button onClick={handleAddOrEditTodo}>
          {editingIndex !== null ? 'Save Changes' : 'Add Task'}
        </button>
      </div>

      {/* Buttons for clearing completed and marking all as completed */}
      <div className="todo-actions">
        <button onClick={markAllCompleted} className="btn-mark-all">
          Mark All as Completed
        </button>
        <button onClick={clearCompleted} className="btn-clear-completed">
          Clear Completed
        </button>
      </div>

      {/* Display the list of todos */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <span onClick={() => toggleTodo(index)}>{todo.text}</span>
            <div className="todo-item-actions">
              <button className="edit-btn" onClick={() => startEditing(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
