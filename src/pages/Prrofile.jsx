import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Prrofile = () => {
  const { user } = useOutletContext();
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `https://nodep-0kn5.onrender.com/user/transactions/${user._id}`,
          {
            headers: { Authorization: token },
          }
        );
        const txs = res.data.transactions || [];

        let sent = 0;
        let received = 0;

        txs.forEach((tx) => {
          if (tx.type === "sent") sent += tx.amount;
          if (tx.type === "received") received += tx.amount;
        });

        setTotalSent(sent);
        setTotalReceived(received);
      } catch (err) {
        console.error("Error fetching transaction totals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user._id]);

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div  style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-light fs-1 phc">Your Profile</h3>
        <div className="text-center mb-4">
          <img
            src={user.profileImage}
            alt="Profile"
            className="rounded-circle shadow"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "cover",
              border: "4px solid #0d6efd",
            }}
          />
        </div>

        <div className="mb-3">
          <h5 className="text-light mb-1">Full Name:</h5>
          <p className="fw-semibold fs-5 emp">
            {user.first_name} {user.last_name}
          </p>
        </div>

        <div className="mb-3">
          <h6 className="text-light mb-1">Email:</h6>
          <p className="fw-normal emp">{user.email}</p>
        </div>

        <div className="mb-3">
          <h6 className="text-light mb-1">Token Balance:</h6>
          <p className="fw-bold fs-4 bptb">{user.balance} VIB</p>
        </div>

        {!loading && (
          <>
            <div className="mb-2">
              <h6 className="text-light mb-1">Total Tokens Sent:</h6>
              <p className="fw-semibold text-danger">{totalSent} VIB</p>
            </div>

            <div className="mb-3">
              <h6 className="text-muted mb-1">Total Tokens Received:</h6>
              <p className="fw-semibold text-success">{totalReceived} VIB</p>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Prrofile;







