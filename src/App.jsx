import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/signup";

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  );
}

export default App;
