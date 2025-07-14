import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import { useState, useEffect } from "react";
import Popup from "./Components/Popup";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CookieConsent from './Components/CookieConsent';

function App() {
  const [showPopup, setShowPopup] = useState(false);
    const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 500);

    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => {
        setShowConsent(true);
      }, 5000);
    }
  }, []);


  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowConsent(false);
  };

  return (
    <>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
       {showConsent && <CookieConsent onAccept={handleAccept} />}
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
