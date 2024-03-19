import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTask] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios
      .get('https://to-do-backend-9n7d.onrender.com/getTasks')
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTask = (event) => {
    event.preventDefault();
    setTask([...tasks, { task: input }]);
    setInput('');
    axios
      .post('https://to-do-backend-9n7d.onrender.com/createTask', {
        task: input,
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="todo-container">
      <h1>Task Lists</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter Task for better future...."
        />
        <button className="addBtn">Add Task</button>
      </form>

      <div className="todo-container-list">
        {tasks.map(({ task }) => {
          return (
            <div key={task}>
              <p>{task}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
