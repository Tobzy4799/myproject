import React, { useEffect, useRef, } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Chart from 'chart.js/auto';


const Dashboard = () => {
  const { user } = useOutletContext();
  const chartRef = useRef(null);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.walletAddress);
    alert("Wallet address copied to clipboard!");
  };



  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Used Tokens', 'Remaining Tokens'],
          datasets: [
            {
              label: 'Token Distribution',
              data: [user.balance - 100, user.balance],
              backgroundColor: ['#dc3545', '#198754'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [user.balance]);

  return (
    <div className="container py-4">
      <h3 className="mb-3 text-light sbdiv">🏠 Dashboard</h3>
      <div className="alert alert-success mb-4" role="alert">
        👋 Welcome back, <strong>{user.first_name}</strong>!
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Your Token Balance</h5>
              <p className="display-6 fw-semibold">{user.balance} VIB</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Wallet Address</h5>
              <p className="text-muted small" style={{ wordBreak: 'break-all' }}>{user.walletAddress}</p>
              <button onClick={copyToClipboard} className="btn btn-outline-primary btn-sm">
                📋 Copy Address
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Token Usage Chart</h5>
              <div style={{ height: '300px', position: 'relative',}}>
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="row mt-4">
        <div className="col">
          <div className="alert alert-warning" role="alert">
            🔐 <strong>Security Tip:</strong> Never share your wallet address privately. Your transactions are public on the blockchain.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



