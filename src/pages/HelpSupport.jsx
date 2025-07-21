import React from "react";

const HelpSupport = () => {
  return (
    <div className="container py-5 d-flex justify-content-center hsdiv">
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <h3 className="mb-4 text-center text-light sbdiv">Help & Support</h3>

        <div className="mb-4">
          <h5 className="text-light">🔧 Common Issues</h5>
          <ul className="text-light">
            <li>Can’t see recent transactions? Try refreshing your dashboard.</li>
            <li>Token not showing up? Check your wallet address and transaction status.</li>
            <li>Forgot your login? Log out and re-login using your Gmail.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5 className="text-light">📘 FAQs</h5>
          <p className="text-light"><strong>Q:</strong> How do I send tokens?<br />
          <strong>A:</strong> Go to the "Send Tokens" page and fill in the wallet address and amount.</p>

          <p className="text-light"><strong>Q:</strong> Can I change my email?<br />
          <strong>A:</strong> No. Email is linked directly to your Gmail login.</p>
        </div>

        <div className="mb-4 text-light">
          <h5 className="text-light">📩 Contact Us</h5>
          <p>If you still need help, reach out to our support team:</p>
          <ul>
            <li >Email: <a className="bptb" href="mailto:oluwatjtunjex@gmail.com">oluwatjtunjex@gmail.com</a></li>
            <li>Twitter: <a className="bptb" href="https://x.com/Tobzy47" target="_blank" rel="noopener noreferrer">@Tobzy47</a></li>
            <li>Telegram: <a className="bptb" href="https://t.me/Adejare200" target="_blank" rel="noopener noreferrer">t.me/Adejare</a></li>
          </ul>
        </div>

        <div className="text-center text-light small">
          Updated July 2025
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
