import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Transactions = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `https://nodep-0kn5.onrender.com/user/transactions/${id}`,
          {
            headers: { Authorization: token },
          }
        );

        let txs = res.data.transactions || [];

        // Deduplicate transactions using timestamp + from + to + amount as unique signature
        const seen = new Set();
        txs = txs.filter((tx) => {
          const key = `${tx.timestamp}-${tx.from}-${tx.to}-${tx.amount}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        setTransactions(txs);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  // Pagination Logic
  const indexOfLastTx = currentPage * transactionsPerPage;
  const indexOfFirstTx = indexOfLastTx - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTx, indexOfLastTx);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center text-light sbdiv">📜 Transaction History</h2>

      {loading ? (
        <div className="text-center text-muted">Loading...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center text-muted">No transactions yet.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount (VIB)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx, index) => (
                  <tr
                    key={`${tx.timestamp}-${tx.from}-${tx.to}-${tx.amount}`}
                    className={tx.type === "sent" ? "table-danger" : "table-success"}
                  >
                    <td className="text-center">{indexOfFirstTx + index + 1}</td>
                    <td className="text-capitalize fw-semibold text-center">{tx.type}</td>
                    <td style={{ fontSize: "0.85rem" }}>{tx.from}</td>
                    <td style={{ fontSize: "0.85rem" }}>{tx.to}</td>
                    <td className="text-center">{tx.amount}</td>
                    <td className="text-center">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Transactions;







