import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerificationScreen = () => {
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsResending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[350px] mx-2 p-6 rounded-lg border shadow-lg text-black">
        <h2 className="text-2xl font-bold text-center mb-4">
          Email Verification
        </h2>
        <div className="text-center mb-6">
          <p className="mb-2">We've sent a verification email to:</p>
          <p className="font-semibold mb-2">{email}</p>
          <p className="text-sm text-gray-600">
            Please check your inbox and click on the verification link to
            complete the process.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className={`px-4 py-2 rounded border border-black text-black
              ${
                isResending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationScreen;
