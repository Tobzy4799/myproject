import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const Welcome = () => {
  const { user } = useOutletContext();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-90 px-3">
  <div
   className='wdiv'
    style={{ maxWidth: '800px', width: '100%', minHeight: '500px' }}
  >
    <img
      src={user.profileImage}
      alt="Profile"
      className="rounded-circle mx-auto mb-4"
      style={{ width: '300px', height: '300px', objectFit: 'cover' }}
    />
    <h2 className="mb-3 fw-bold text-light">Welcome to VibraWallet, {user.first_name} 👋</h2>
    <p className="fs-5 text-light mb-2">Your wallet is ready for action.</p>
    <p className="fs-6 text-light mb-4">Click below to explore your dashboard.</p>
    <Link to="dashboard">
      <button className="btn btn-primary btn-lg w-100">Go to Dashboard</button>
    </Link>
  </div>
</div>

  );
};

export default Welcome;

