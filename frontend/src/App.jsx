import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from backend
  useEffect(() => {
    fetch("http://localhost:5000/test")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!newTodo.trim()) return alert("Todo cannot be empty!");
    await fetch("http://localhost:5000/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo("");
    const updated = await fetch("http://localhost:5000/test").then((res) =>
      res.json()
    );
    setTodos(updated);
  };


  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title} <small>({new Date(t.created_at).toLocaleString()})</small>
          </li>
        ))}
      </ul>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default App;
