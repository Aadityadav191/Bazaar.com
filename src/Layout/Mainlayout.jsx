import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

export default function Mainlayout() {
  const location = useLocation();
  const pathsWithoutFooter = ["/profile"];
  const shouldHideFooter = pathsWithoutFooter.includes(location.pathname);
  return (
    <>
      <div className="flex flex-col min-h-screen bg-zinc-50">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Conditional evaluation: If the user is on /profile, the footer disappears */}
        {!shouldHideFooter && <Footer />}
      </div>
    </>
  );
}

