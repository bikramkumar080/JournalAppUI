import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (calledRef.current) return; // prevent double call
      calledRef.current = true;

      if (code) {
        try {
          const response = await fetch(
            `http://localhost:8081/api/auth/google/callback?code=${code}`
          );
          const token = await response.text();
          localStorage.setItem("token", token);
          navigate("/user-dashboard");
        } catch (err) {
          console.error("Error during Google login:", err);
        }
      }
    };

    handleGoogleCallback();
  }, [code, navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleCallback;