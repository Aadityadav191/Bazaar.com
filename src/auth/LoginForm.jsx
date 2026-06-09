import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Mail, Lock, LogIn, Chrome } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../services/userService";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async (values, setSubmitting) => {
    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });

      // Save token or user in localStorage if needed
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Login error:", error.response || error);
      toast.error(
        error.response?.data?.message || "Login failed. Check your credentials."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ToastContainer />

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#c51215] tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Please enter your details to sign in to your account.
        </p>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) errors.email = "Email is required";
          if (!values.password) errors.password = "Password is required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => handleLogin(values, setSubmitting)}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className={`block w-full pl-10 pr-4 py-3 border rounded-xl text-sm
                  ${errors.email && touched.email
                    ? "border-red-500 ring-4 ring-red-50"
                    : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50"
                  }`}
                />
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs font-bold text-[#e27973] hover:text-green-700"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  className={`block w-full pl-10 pr-4 py-3 border rounded-xl text-sm
                  ${errors.password && touched.password
                    ? "border-red-500 ring-4 ring-red-50"
                    : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-[10px] ml-1 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-bold text-[#e27973] hover:text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Authenticating..." : "Sign In"}
              {!isSubmitting && <LogIn className="h-4 w-4" />}
            </button>

            <p className="text-center text-sm text-gray-600 pt-1">
              New here?{" "}
              <Link
                to="/auth/signup"
                className="font-bold text-[#c51215] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}