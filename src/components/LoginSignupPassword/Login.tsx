import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios"; // Import Axios for HTTP requests
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message
  const [successMessage] = useState<string>(""); // State for success message
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading indicator
  const navigate = useNavigate(); // Hook to navigate between pages
  const apiUrl = import.meta.env.VITE_API_URL; // API URL from environment variables

  // Function to validate email
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Function to validate the form inputs
  const validateForm = (): boolean => {
    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address.");
      return false;
    }

    return true;
  };

  // Function to handle login action
  const handleLogin = async () => {
    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await Axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      const user = response.data; // Response data from the server
      console.log("Login successful:", user);

      // Clear previous user data from localStorage
      localStorage.removeItem("user");

      // Save new user data to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-password-container">
      <div className="header">
        <h1>Login</h1>
      </div>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <button
          type="button"
          className="confirm-button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="toggle-action">
          New here? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </div>
        <div className="toggle-action">
          Forgot Password?{" "}
          <span onClick={() => navigate("/lost-password")}>Click Here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
