import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import { Modal, Button, Toast, ToastContainer } from "react-bootstrap";
import icon from "../assets/icon.jpg";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `https://nodep-0kn5.onrender.com/user/dashboard/${id}`,
          { headers: { Authorization: token } }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("User fetch failed:", err);
      }
    };

    fetchUser();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  if (!user) return <div className="text-center mt-0 ldpg">Loading...</div>;

  return (
    <div className="container-fluid p-0 m-0">

      <div className="d-md-none bg-primary p-2 border-bottom d-flex justify-content-between align-items-center" style={{width:'100%'}}>
        <button
          className="btn btn-outline-light"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Menu
        </button> 
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
              <img src={icon} height={20} width={20} alt="icon" />
              <div>
                <h3 className="m-0 fw-bold text-light fs-6">VibraWallet</h3>
              </div>
              </div>
          <div>
           
          <button onClick={() => setShowModal(true)} className="btn btn-sm btn-outline-danger">
            Logout
          </button>
          </div>
        </div>
      </div>

      <div className="row g-0">
        {/* Sidebar */}
        <nav
          className={`col-md-3 col-lg-2.5 p-4 min-vh-100 border-end d-md-block ${sidebarOpen ? "d-block" : "d-none"}`}
          style={{ backgroundColor: "#1e293b", fontFamily: "'Poppins', sans-serif" }}
        >
          <Link to={`/home/${id}`} className="text-decoration-none text-light">
            <h4 className="fw-bold mb-3 hhover">Home</h4>
          </Link>
        
          <ul className="nav flex-column">
            <li className="nav-item mt-5 hhover">
              <Link className="nav-link text-light fs-5" to={`/home/${id}/dashboard`}><span className="hhhover">📊 Dashboard</span></Link>
            </li>
             <li className="nav-item mt-4 hhover">
              <Link className="nav-link text-light fs-5" to={`/home/${id}/send`}><span className="hhhover">💸 Send Tokens</span></Link>
            </li>
            <li className="nav-item mt-4 hhover">
              <Link className="nav-link text-light fs-5" to={`/home/${id}/transactions`}><span className="hhhover">📜 Transaction History</span></Link>
            </li>
            <li className="nav-item mt-4 hhover">
              <Link className="nav-link text-light fs-5" to={`/home/${id}/profile`}><span className="hhhover">🙍 Profile</span></Link>
            </li>
            <li className="nav-item mt-4 fs-5 hhover">
              <Link to={`/home/${user.id}/help`} className="nav-link text-light"><span className="hhhover">🆘 Help & Support</span></Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-8 col-lg-9 px-3 py-3 hmain" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {/* Desktop Top Bar */}
          <div className="d-none d-md-flex justify-content-between align-items-center mb-4 hmdiv">
            <div className="d-flex align-items-center gap-2">
              <img src={icon} height={40} width={40} alt="icon" />
              <div>
                <h3 className="m-0 fw-bold text-light">VibraWallet</h3>
                <p className="text-light fs-6 m-0">Your gateway to fast and secure token transfers.</p>
              </div>
            
            </div>
            <div className="d-flex align-items-center">
              <button onClick={() => setShowModal(true)} className="btn btn-outline-danger btn-sm">
                Logout
              </button>
            </div>
          </div>

          <div className="px-md-4" style={{ maxWidth: "100%", width: "100%" }}>
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={1500}
          autohide
        >
          <Toast.Body className="text-white">Logged out successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Home;





