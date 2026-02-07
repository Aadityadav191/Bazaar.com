import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import AboutPage from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import FAQ from "../pages/FAQ";
import ReturnRefund from "../pages/ReturnRefund";
import Mainlayout from "../Layout/Mainlayout";
import Authlayout from "../Layout/authlayout";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
   <>
     <Routes>
      <Route element={<Mainlayout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/return-refunds" element={<ReturnRefund />} />
      <Route path="*" element={<NotFound />} />
    </Route>

    <Route element={<Authlayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
     </Routes>
   </>
  );
};

export default AppRouter;