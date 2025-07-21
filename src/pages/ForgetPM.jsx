import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from "../assets/icon.jpg";

const ForgetPM = () => {
  const [email, setmail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null); 

  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setEmailValid(isValid);
    setmail(value);
  };

  const handleCheck = async () => {
    if (!emailValid || !password) {
      alert("Please enter a valid email and password.");
      return;
    }

    setLoading(true);
    const endpoint = 'https://nodep-0kn5.onrender.com/user/check-mail';
    const checkDet = { email, password };

    try {
      const response = await axios.post(endpoint, checkDet);
      console.log("Response data:", response.data);

      if (response.data.message === "Account updated successfully") {
        alert("Account updated successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        alert("Failed to update account. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fordiv">
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
        <h4 className="mb-3 text-primary">Reset your VibraWallet Password</h4>

        <input
          type="email"
          className={`form-control mb-3 ${emailValid === null ? "" : emailValid ? "is-valid" : "is-invalid"}`}
          placeholder="Input registered email"
          onChange={(e) => validateEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Input new password"
          onChange={(e) => setpassword(e.target.value)}
          required
        />

        <button
          className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
          onClick={handleCheck}
          disabled={loading}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default ForgetPM;
