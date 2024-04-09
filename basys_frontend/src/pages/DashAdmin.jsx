import React, { useState } from "react";
import PayerForm from "../components/PayerForm";
import ProviderForm from "../components/ProviderForm";
import AdminHome from "../components/AdminHome";
import Logs from "../components/Logs";
import Home from "../components/Home";

const DashAdmin = () => {
  const [display, setDisplay] = useState("home");

  const menuHandler = (value) => {
    setDisplay(value);
  };
  return (
    <div className="h-screen w-screen">
      <div className="bg-blue-500 p-4">
        <h1 className="text-white text-lg">Welcome to Basys</h1>
      </div>
      {/* Left Menu Bar */}
      <div className="flex h-screen">
        <div className="bg-gray-200 w-1/5 border-r border-gray-300">
          <ul className="py-4">
            <li className="py-2 pl-4" onClick={() => menuHandler("home")}>
              <a
                href="#"
                className={`block text-gray-700 hover:bg-blue-500 hover:text-white py-1 px-4 ${
                  display === "home" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Home
              </a>
            </li>
            <li
              className="py-2 pl-4 border-b border-gray-300"
              onClick={() => menuHandler("provider")}
            >
              <a
                href="#"
                className={`block text-gray-700 hover:bg-blue-500 hover:text-white py-1 px-4 ${
                  display === "provider" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Add Provider
              </a>
            </li>
            <li
              className="py-2 pl-4 border-b border-gray-300"
              onClick={() => menuHandler("payer")}
            >
              <a
                href="#"
                className={`block text-gray-700 hover:bg-blue-500 hover:text-white py-1 px-4 ${
                  display === "payer" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Add Payer
              </a>
            </li>
            <li className="py-2 pl-4" onClick={() => menuHandler("logs")}>
              <a
                href="#"
                className={`block text-gray-700 hover:bg-blue-500 hover:text-white py-1 px-4 ${
                  display === "logs" ? "bg-blue-500 text-white" : ""
                }`}
              >
                Logs
              </a>
            </li>
          </ul>
        </div>

        <div className="w-1 bg-gray-300"></div>

        {/* Right Pane */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          {display === "payer" && <PayerForm />}
          {display === "provider" && <ProviderForm />}
          {display === "logs" && <Logs />}
          {display === "home" && <Home />}
        </div>
      </div>
    </div>
  );
};

export default DashAdmin;
