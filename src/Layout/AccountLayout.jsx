import React from "react";
import Navbar from "../Components/Common/Navbar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-zinc-50">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </>
  );
}
