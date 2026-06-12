import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import Authlayout from "../Layout/Authlayout";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../auth/ForgotPassword";
import VerifyOtp from "../auth/VerifyOtp";
import ResetPassword from "../auth/ResetPassword";
import Profile from "../pages/Account/Profile";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

const ProtectedRoute = () => {
  const hasToken = localStorage.getItem("token");
  const hasUser = localStorage.getItem("user");
  return hasToken && hasUser ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

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
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/auth" element={<Authlayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
