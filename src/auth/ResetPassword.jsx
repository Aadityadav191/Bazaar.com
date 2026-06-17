import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strength = Object.values(passwordRules).filter(Boolean).length;

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const isValid = Object.values(passwordRules).every(Boolean) && passwordsMatch;

  const handleReset = async () => {
    if (!isValid) return;
    try {
      setLoading(true);
      toast.success(
        "Password reset successful! Please log in with your new password.",
        {
          autoClose: 1500,
        },
      );
      // await resetPassword(password);
      setPassword("");
      setConfirmPassword("");
      navigate("/auth/login");
      console.log("Password reset successful");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
          <Lock className="text-indigo-600" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-900">
        Create New Password
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Your new password must be different from previously used passwords.
      </p>

      {/* Password */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">New Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mt-5">
        <label className="block text-sm font-medium mb-2">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Strength Meter */}
      {password && (
        <div className="mt-5">
          <div className="flex justify-between text-sm mb-2">
            <span>Password Strength</span>
            <span
              className={`font-medium ${
                strength <= 2
                  ? "text-red-500"
                  : strength <= 4
                    ? "text-yellow-500"
                    : "text-green-500"
              }`}
            >
              {getStrengthText()}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getStrengthColor()} transition-all duration-300`}
              style={{
                width: `${(strength / 5) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Requirements */}
      <div className="mt-5 space-y-2 text-sm">
        <Requirement met={passwordRules.length} text="At least 8 characters" />

        <Requirement
          met={passwordRules.uppercase}
          text="One uppercase letter"
        />

        <Requirement
          met={passwordRules.lowercase}
          text="One lowercase letter"
        />

        <Requirement met={passwordRules.number} text="One number" />

        <Requirement met={passwordRules.special} text="One special character" />

        {confirmPassword && (
          <Requirement met={passwordsMatch} text="Passwords match" />
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleReset}
        disabled={!isValid || loading}
        className="w-full mt-8 bg-[#e47e73] hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Updating Password..." : "Reset Password"}
      </button>

      <p className="text-center text-xs text-gray-400 mt-6">
        Your password will be securely encrypted and stored.
      </p>
    </>
  );
}

function Requirement({ met, text }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          met ? "bg-green-500" : "bg-gray-300"
        }`}
      />
      <span className={met ? "text-green-600" : "text-gray-500"}>{text}</span>
    </div>
  );
}
