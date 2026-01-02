import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Components/Common/Footer";
import Popup from "./Components/Popup";
import CookieConsent from './Components/CookieConsent';
import AppRouter from "./router/AppRouter"; 
import Navbar from "./Components/Common/Navbar";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setShowConsent(false), 5000);
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
      <Navbar/>
      
      <main className="min-h-screen">
        <AppRouter />
      </main>

      <Footer/>
    </>
  );
}

export default App;