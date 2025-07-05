import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import { useState, useEffect } from "react";
import Popup from "./Components/Popup";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 500);
  }, []);

  return (
    <>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
