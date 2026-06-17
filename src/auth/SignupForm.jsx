import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  User,
  Mail,
  Lock,
  Chrome,
  Facebook,
  Github,
  Phone,
} from "lucide-react";
import { signupUser } from "../services/userService";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  // ✅ Handle signup with backend API
  const handleSignup = async (data) => {
    try {
      const response = await signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      toast.success("Account created successfully!", {
        autoClose: 1500,
      });
      console.log("Signup response:", response);
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        toast.error(error.response.data.message || "Error creating user.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error("Error creating user: " + error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ToastContainer />

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#c51215]">Create an account</h2>
        <p className="text-gray-500 text-sm mt-2">
          Start your shopping journey with Bazaar.com
        </p>
      </div>

      {/* Social Buttons (optional - not connected) */}
      {/* <div className="grid grid-cols-3 gap-3 mb-8">
        <button
          type="button"
          className="flex justify-center items-center py-2.5 border rounded-lg"
        >
          <Chrome className="w-5 h-5 text-red-500" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center py-2.5 border rounded-lg"
        >
          <Facebook className="w-5 h-5 text-blue-600" />
        </button>
        <button
          type="button"
          className="flex justify-center items-center py-2.5 border rounded-lg"
        >
          <Github className="w-5 h-5 text-gray-900" />
        </button>
      </div> */}

      {/* Divider */}
      {/* <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">
            Or continue with email
          </span>
        </div>
      </div> */}

      {/* FORM */}
      <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
        {/* NAME */}
        <div>
          <label className="text-xs font-semibold text-gray-500">
            Full Name
          </label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm"
              placeholder="Your full name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-xs font-semibold text-gray-500">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        {/* PHONE NUMBER */}
        <div>
          <label className="text-xs font-semibold text-gray-500">
            Phone Number
          </label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("phone", { required: "Phone number is required" })}
              type="tel"
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm"
              placeholder="Your phone number"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-xs font-semibold text-gray-500">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm"
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* TERMS */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("terms", { required: true })}
            className="mt-1"
          />
          <label className="text-xs text-gray-600">
            I agree to the Terms & Privacy Policy
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs">You must accept terms</p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-black text-white rounded-xl font-semibold"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-green-600 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
