
import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleAPI";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        {/* Header Section */}
        <header className="header">
          <h1 className="main-title">To-Do App</h1>
        </header>

        {/* ToDo Input Section */}
        <div className="top">
          <input
            type="text"
            placeholder="Compose a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="todo-input"
          />
          <button
            className="add-button"
            onClick={isUpdating ? 
              () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
              : () => addToDo(text, setText, setToDo)}
          >
            {isUpdating ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* ToDo List Section */}
        <div className="list-section">
          <h2 className="list-title">Today's Tasks</h2>
          <ul className="list">
            {toDo.map((item) => (
              <ToDo 
                key={item._id} 
                text={item.text} 
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, setToDo)} 
              />
            ))}
          </ul>
        </div>

        {/* API Section */}
        <div className="api-section">
          <div className="api-card">
            <h2 className="api-title">API References</h2>
            <div className="api-links">
              <div className="api-link-item">
                <a href="https://web.postman.co/" target="_blank" rel="noopener noreferrer">
                  Create
                </a>
                <span>: https://todo-app-backend-vijy.onrender.com/save</span>
              </div>
              <div className="api-link-item">
                <a href="https://web.postman.co/" target="_blank" rel="noopener noreferrer">
                  Retrieve
                </a>
                <span>: https://todo-app-backend-vijy.onrender.com/</span>
              </div>
              <div className="api-link-item">
                <a href="https://web.postman.co/" target="_blank" rel="noopener noreferrer">
                  Update
                </a>
                <span>: https://todo-app-backend-vijy.onrender.com/update</span>
              </div>
              <div className="api-link-item">
                <a href="https://web.postman.co/" target="_blank" rel="noopener noreferrer">
                  Delete
                </a>
                <span>: https://todo-app-backend-vijy.onrender.com/delete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
