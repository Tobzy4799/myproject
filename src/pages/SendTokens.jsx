import React, { useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const SendTokens = () => {
  const { user } = useOutletContext();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!recipient || !amount) {
      setMessage({ type: "danger", text: "Please fill in all fields." });
      return;
    }

    if (amount <= 0 || isNaN(amount)) {
      setMessage({ type: "danger", text: "Amount must be greater than 0." });
      return;
    }

    setShowConfirm(true);
  };

  const confirmSend = async () => {
    setShowConfirm(false);
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {
      senderId: user._id,
      recipientAddress: recipient.trim(),
      amount: Number(amount),
    };

    try {
      const res = await axios.post("https://nodep-0kn5.onrender.com/user/transfer", payload, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.status) {
        setMessage({ type: "success", text: res.data.message });
        setAmount("");
        setRecipient("");
      } else {
        setMessage({ type: "danger", text: res.data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Transaction failed. Try again." });
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-light sbdiv">💸 Send VIB Tokens to VIB compatible address</h3>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSend}>
        <div className="mb-3">
          <label className="form-label">Recipient Wallet Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter wallet address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount to Send (VIB)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={1}
            max={user.balance}
          />
          <small className="text-muted">Available: {user.balance} VIB</small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Send Tokens"
          )}
        </button>
      </form>

      <div className="alert alert-warning mt-4">
        ⚠️ Double-check the recipient address. Transactions are irreversible.
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Transaction</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>You are about to send <strong>{amount} VIB</strong> to:</p>
                <p className="text-muted">{recipient}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-success" onClick={confirmSend} disabled={loading}>
                  {loading ? "Sending..." : "Confirm Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendTokens;



