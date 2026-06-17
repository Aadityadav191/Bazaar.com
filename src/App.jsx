import React, { useState, useEffect } from "react";
import "./App.css";

import Popup from "./Components/Popup";
import CookieConsent from "./Components/CookieConsent";
import AppRouter from "./router/AppRouter";
import { CartProvider } from "./context/CartContext";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setTimeout(() => setShowConsent(false), 5000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowConsent(false);
  };

  return (
    <>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      {showConsent && <CookieConsent onAccept={handleAccept} />}

      <main className="min-h-screen">
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </main>
    </>
  );
}

export default App;
