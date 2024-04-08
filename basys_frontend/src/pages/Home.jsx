import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const baseUrl = process.env.VITE_REACT_API_URL;
  const baseUrl = JSON.stringify(import.meta.env.VITE_REACT_API_URL);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed, Please try again");
      }
      const responseData = await response.json();

      reset();

      if (responseData.role === "admin") {
        navigateTo("/dashAdmin");
      } else {
        navigateTo("/dashProvider");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h3 className="text-lg font-bold mb-4">Please login to continue</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 border-solid border-2 rounded-md"
      >
        <div className="mb-6 px-6 mt-6">
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.username ? "border-red-500" : ""
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">Username is required</p>
          )}
        </div>
        <div className="mb-6 px-6">
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">Password is required</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
