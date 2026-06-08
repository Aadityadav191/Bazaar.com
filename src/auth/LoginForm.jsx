import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Mail, Lock, LogIn, Chrome } from "lucide-react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed.");
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <>
      <div className="w-full">
      <ToastContainer />
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 mt-2 text-sm">Please enter your details to sign in to your account.</p>
      </div>

      {/* Social Login */}
      <button
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
      >
        <Chrome className="h-5 w-5 text-red-500" />
        Sign in with Google
      </button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-medium">Or email login</span></div>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) errors.email = "Email is required";
          if (!values.password) errors.password = "Password is required";
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast.success("Login Successful!");
            setTimeout(() => navigate("/"), 1500);
          } catch (error) {
            toast.error("Invalid email or password");
            setSubmitting(false);
            console.error("Login error:", error);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className={`block w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all outline-none
                    ${errors.email && touched.email 
                      ? "border-red-500 ring-4 ring-red-50" 
                      : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50"}`}
                />
              </div>
              <ErrorMessage name="email" component="p" className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium" />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-700">
                  Password
                </label>
                <Link to="/auth/forgot-password" size="sm" className="text-xs font-bold text-green-600 hover:text-green-700">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all outline-none
                    ${errors.password && touched.password 
                      ? "border-red-500 ring-4 ring-red-50" 
                      : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50"}`}
                />
              </div>
              <ErrorMessage name="password" component="p" className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Authenticating..." : "Sign In"}
              {!isSubmitting && <LogIn className="h-4 w-4" />}
            </button>

            <p className="text-center text-sm text-gray-600 pt-4">
              New here?{" "}
              <Link to="/auth/signup" className="font-bold text-green-600 hover:underline">
                Create an account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
}