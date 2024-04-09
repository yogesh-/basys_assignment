import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DashAdmin from "./pages/DashAdmin";
import ChangePass from "./pages/ChangePass";
import CommonDash from "./pages/CommonDash";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashAdmin" element={<DashAdmin />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="commonDash" element={<CommonDash />} />
    </Routes>
  );
}

export default App;
