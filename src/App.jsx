import { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [inputValue, setInputValue] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved && saved.length > 0) {
      setTodos(saved);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Add todo
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  // Toggle complete
  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Filtered list
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-gradient text-dark text-center py-4">
          <h1 className="mb-0">
            <i className="fas fa-tasks me-3"></i>My Todo List
          </h1>
        </div>

        <div className="card-body p-4">
          {/* Input */}
          <div className="input-group input-group-lg mb-4 shadow-sm">
            <input
              type="text"
              className="form-control border-0"
              placeholder="What needs to be done today?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <button className="btn btn-primary px-5" onClick={addTodo}>
              <i className="fas fa-plus me-2"></i>Add
            </button>
          </div>

          {/* Filters */}
          <div className="btn-group w-100 mb-4 shadow-sm" role="group">
            <button
              className={`btn btn-outline-primary rounded-start ${
                filter === "all" ? "active" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              <i className="fas fa-list me-2"></i>All
            </button>

            <button
              className={`btn btn-outline-primary ${
                filter === "active" ? "active" : ""
              }`}
              onClick={() => setFilter("active")}
            >
              <i className="fas fa-clock me-2"></i>Active
            </button>

            <button
              className={`btn btn-outline-primary rounded-end ${
                filter === "completed" ? "active" : ""
              }`}
              onClick={() => setFilter("completed")}
            >
              <i className="fas fa-check me-2"></i>Completed
            </button>
          </div>

          {/* Todo List */}
          <ul className="list-group list-group-flush">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  todo.completed ? "completed" : ""
                }`}
              >
                <span className="todo-text">{todo.text}</span>

                <div className="btn-group">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <i className="fas fa-check"></i>
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Empty State */}
          {filteredTodos.length === 0 && (
            <div className="text-center py-5 text-muted">
              <h5>No tasks</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
