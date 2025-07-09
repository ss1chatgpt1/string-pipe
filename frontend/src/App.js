import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

// Import pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AgentBuilder from "./pages/AgentBuilder";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import Templates from "./pages/Templates";
import AgentDetail from "./pages/AgentDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agent-builder" element={<AgentBuilder />} />
          <Route path="/workflow-builder" element={<WorkflowBuilder />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;