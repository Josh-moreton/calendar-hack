/**
 * Email Verification Page Component
 * Handles email verification flow with URL parameters
 */

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { EmailVerification } from "./EmailVerification";
import { useAuth } from "../../contexts/AuthContext";

export function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // Get email from URL params or user context
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else if (user?.email) {
      setEmail(user.email);
    } else {
      // If no email available, redirect to signup
      navigate("/signup");
    }
  }, [searchParams, user, navigate]);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <EmailVerification email={email} />;
}
