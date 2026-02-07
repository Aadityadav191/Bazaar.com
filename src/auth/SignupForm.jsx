import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { User, Mail, Lock, Chrome, Facebook, Github } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";


export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Welcome aboard! Account created.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ToastContainer />
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        <p className="text-gray-500 text-sm mt-2">Start your 14-day free trial today.</p>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <button onClick={handleGoogleSignIn} className="flex justify-center items-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Chrome className="w-5 h-5 text-red-500" />
        </button>
        <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Facebook className="w-5 h-5 text-blue-600" />
        </button>
        <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Github className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span></div>
      </div>

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("name", { required: "Name is required" })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-green-100 transition-all outline-none ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-green-500'}`}
              placeholder="Your full name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name.message}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-green-100 transition-all outline-none ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-green-500'}`}
              placeholder="yourmail@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="password"
              {...register("password", { 
                required: "Password required",
                minLength: { value: 6, message: "Min 6 characters" }
              })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-green-100 transition-all outline-none ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-green-500'}`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.password.message}</p>}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            {...register("terms", { required: true })}
            className="mt-1 w-4 h-4 rounded text-green-600 border-gray-300 focus:ring-green-500"
          />
          <label className="text-xs text-gray-600 leading-tight">
            I agree to the <Link to="/terms" className="text-green-600 font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-green-600 font-bold hover:underline">Privacy Policy</Link>.
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-[10px] ml-6">You must agree to continue</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all transform active:scale-[0.98] disabled:opacity-70 mt-4"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-bold hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}