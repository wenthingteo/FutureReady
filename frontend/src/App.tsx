import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Dashboard from "../pages/Dashboard";

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
  <>
    <Sidebar />
    <Dashboard />
  </>
);
}

export default App;
