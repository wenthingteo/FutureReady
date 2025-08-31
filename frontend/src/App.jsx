import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import Workplace from "./pages/Workplace";
import Ideation from "./pages/Ideation";
import Competitor from "./pages/Competitor";
import CampaignsContainer from "./pages/campaign/CampaignsContainer";
import Ads from "./pages/Ads";
import AIAgent from "./pages/AIAgent";

function App() {
  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar stays on all pages */}
      <Sidebar />

      {/* Main Content changes depending on route */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/content/workplace" element={<Workplace />} />
          <Route path="/content/ideation" element={<Ideation />} />
          <Route path="/content/competitor" element={<Competitor />} />
          <Route path="/campaigns" element={<CampaignsContainer />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/ai-agent" element={<AIAgent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;


// import { useEffect, useState } from "react";
// import Sidebar from "../components/sidebar";
// import Dashboard from "../pages/Dashboard";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");

//   // Fetch todos from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/test")
//       .then((res) => res.json())
//       .then((data) => setTodos(data));
//   }, []);

//   // Add todo
//   const addTodo = async () => {
//     if (!newTodo.trim()) return alert("Todo cannot be empty!");
//     await fetch("http://localhost:5000/test", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: newTodo }),
//     });
//     setNewTodo("");
//     const updated = await fetch("http://localhost:5000/test").then((res) =>
//       res.json()
//     );
//     setTodos(updated);
//   };


//   return (
//   <>
//     <Sidebar />
//     <Dashboard />
//   </>
// );
// }

// export default App;
