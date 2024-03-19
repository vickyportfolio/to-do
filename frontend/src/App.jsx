import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTask] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/getTasks')
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTask = (event) => {
    event.preventDefault();
    console.log(input);
    axios
      .post('http://localhost:3001/createTask', { task: input })
      .then((res) => {
        setTask([...tasks, { task: input }]);
        console.log(tasks);
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
