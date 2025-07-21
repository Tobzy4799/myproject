import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from "../assets/icon.jpg";

const Register = () => {
  const [first_name, setfirstname] = useState('');
  const [phone_number, setphonenumber] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [file, setfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [phoneValid, setPhoneValid] = useState(null);
  const [nameValid, setNameValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setemail(value);
    setEmailValid(regex.test(value));
  };

  const validatePhone = (value) => {
    const regex = /^[0-9]{10,15}$/;
    setphonenumber(value);
    setPhoneValid(regex.test(value));
  };

  const validateName = (value) => {
    setfirstname(value);
    setNameValid(value.trim() !== '');
  };

  const validatePassword = (value) => {
    setpassword(value);
    setPasswordValid(value.length >= 7);
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setfile(reader.result);
    if (image) reader.readAsDataURL(image);
  };

  const handleSubmit = async () => {
    if (!emailValid || !phoneValid || !nameValid || !passwordValid) {
      alert("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    const endpoint = 'https://nodep-0kn5.onrender.com/user/sign-up';
    const regDet = {
      first_name,
      phone_number,
      email,
      password,
      profileImage: file,
    };

    try {
      const response = await axios.post(endpoint, regDet, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.status) {
        alert("Account created successfully!");
        navigate('/login');
      } else {
        alert("Try registering again.");
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="regdiv">
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




      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h4 className="mb-4 text-center text-primary">
          Welcome to VibraWallet, Register to continue
        </h4>

        <input
          type="text"
          className={`form-control mb-3 ${
            nameValid === null ? '' : nameValid ? 'is-valid' : 'is-invalid'
          }`}
          placeholder="Full Name"
          value={first_name}
          onChange={(e) => validateName(e.target.value)}
          required
        />

        <input
          type="tel"
          className={`form-control mb-3 ${
            phoneValid === null ? '' : phoneValid ? 'is-valid' : 'is-invalid'
          }`}
          placeholder="Phone Number"
          value={phone_number}
          onChange={(e) => validatePhone(e.target.value)}
          required
        />

        <input
          type="email"
          className={`form-control mb-3 ${
            emailValid === null ? '' : emailValid ? 'is-valid' : 'is-invalid'
          }`}
          placeholder="Email"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className={`form-control mb-3 ${
            passwordValid === null ? '' : passwordValid ? 'is-valid' : 'is-invalid'
          }`}
          placeholder="Password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          required
        />

        <input
          type="file"
          className="form-control mb-4"
          onChange={handleFileChange}
        />

        <button
          className="btn btn-primary w-100 mb-3 d-flex justify-content-center align-items-center gap-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {loading ? "Registering..." : "Submit"}
        </button>

        <div className="text-center">
          <span className="text-primary">Already registered? </span>
          <Link to="/login" className="text-decoration-none text-danger">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;




