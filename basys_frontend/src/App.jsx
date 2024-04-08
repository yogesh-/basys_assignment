import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DashAdmin from "./pages/DashAdmin";
import DashProvider from "./pages/DashProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashAdmin" element={<DashAdmin />} />
      <Route path="dashProvider" element={<DashProvider />} />
    </Routes>
  );
}

export default App;
