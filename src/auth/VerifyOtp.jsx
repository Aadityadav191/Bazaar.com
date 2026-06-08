import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const otpArray = pastedData.split("");

    const newOtp = [...otp];

    otpArray.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(otpArray.length - 1, 5);

    inputsRef.current[lastIndex]?.focus();
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter a valid OTP");
      return;
    }

    try {
      setLoading(true);

      // await verifyOtp(email, enteredOtp);

      setTimeout(() => {
        navigate("/auth/reset-password", {
          state: { email },
        });
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // await resendOtp(email);

    setTimer(60);
  };

  return (
    <>
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-3xl">
            🔐
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-2">
          We've sent a verification code to
        </p>

        <div className="mt-3 bg-gray-50 border rounded-xl p-3 text-center">
          <span className="font-medium text-gray-700">{email}</span>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mt-8" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in{" "}
              <span className="font-semibold text-indigo-600">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-indigo-600 font-medium hover:text-indigo-700"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Didn't receive the code? Check your spam folder.
        </p>
    </>
  );
}
