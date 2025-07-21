import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.jpg";

const Login = () => {
  const [loginId, setloginId] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (input) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(input);
  };

  const handleLogin = async () => {
    if (!loginId || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (loginId.includes("@") && !validateEmail(loginId)) {
      alert("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const endpoint = "https://nodep-0kn5.onrender.com/user/login";
    const loginDet = { loginId, password };

    try {
      const response = await axios.post(endpoint, loginDet);
      console.log("Response data:", response.data);

      if (response.data.message === "signin successful") {
        alert("Login successful");
        localStorage.setItem("token", response.data.token);
        navigate(`/home/${response.data.id}`);
      } else {
        alert("Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setloginId(value);

    if (value.includes("@")) {
      setEmailValid(validateEmail(value));
    } else {
      setEmailValid(null); 
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setpassword(value);
    setPasswordValid(value.length >= 6);
  };

  return (
    <div className="logindiv">
      <div
        className="text-center py-3"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
          <img src={icon} height={40} width={40} alt="icon" />
          <h3 className="m-0 fw-bold text-white vibh">VibraWallet</h3>
        </div>
      
        <p className="text-light fs-6 m-0">Your gateway to fast and secure token transfers.</p>
      </div>

      <div className="card shadow mt-5 p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <p className="text-primary mb-4">
          <strong style={{ fontSize: "25px" }}>Login to your VibraWallet</strong>
        </p>

        <div className="mb-3">
          <label className="form-label text-primary">Email or Phone Number</label>
          <input
            type="text"
            className={`form-control ${
              emailValid === true ? "is-valid" : emailValid === false ? "is-invalid" : ""
            }`}
            placeholder="Your email or phone number"
            value={loginId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-primary">Password</label>
          <input
            type="password"
            className={`form-control ${
              passwordValid === true ? "is-valid" : passwordValid === false ? "is-invalid" : ""
            }`}
            placeholder="Your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="d-grid mb-2">
          <button
            onClick={handleLogin}
            className="btn btn-primary d-flex justify-content-center align-items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="text-center">
          <a href="/check-mail" className="text-decoration-none text-primary">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;



