import React from "react";
import { Link } from "react-router-dom";
import "./UserSidePanel.css";

const SidePanel: React.FC = () => {
  return (
    <div className="user-side-panel">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/user/my-account">My Account</Link>
          </li>
          <li>
            <Link to="/user/my-orders">My Orders</Link>
          </li>
          <li>
            <Link to="/user/support">Support</Link>
          </li>
          <li>
            <Link to="/new-password">Change Password</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidePanel;
