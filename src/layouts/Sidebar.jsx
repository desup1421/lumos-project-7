import React, { useState } from "react";
import { Link } from "react-router-dom"
import logo from "../assets/img/logo.png";
const Sidebar = () => {
  const [active, setActive] = useState(false);
  const toggleSidebar = () => {
    setActive(!active);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {active ? (
          <i className="bx bx-x toggle-icon"></i>
        ) : (
          <i className="bx bx-menu toggle-icon"></i>
        )}
      </button>

      <aside className={`sidebar ${active ? "" : "close"}`}>
        <header className="sidebar-header">
          <img src={logo} alt="logo" />
          <h1>WMS</h1>
        </header>

        <ul className="sidebar-list">
          <li>
            <div className="flex-gap">
              <i className="bx bxs-dashboard nav-icon"></i>
              <Link to='/'>Dashboard</Link>
            </div>
          </li>
          <li>
            <div className="flex-gap">
              <i className="bx bxs-package nav-icon"></i>
              <span>Inventory Management</span>
            </div>
            <ul className="sub-menu">
              <li><Link to="/inventory"><i className="bx bx-list-ul nav-icon"></i>Product list</Link></li>
              <li><Link to="/inventory/update"><i className="bx bxs-edit nav-icon"></i>Update product</Link></li>
              <li><Link to="/inventory/delete"><i className="bx bxs-trash nav-icon"></i>Delete product</Link></li>
            </ul>
          </li>
          <li>
            <div className="flex-gap">
              <i className="bx bxs-cart nav-icon"></i>
              <a href="#">Orders</a>
            </div>
            <ul className="sub-menu">
              <li><Link to="/stock/in"><i className="bx bxs-log-in-circle nav-icon"></i>Stock-in</Link></li>
              <li><Link to="/stock/out"><i className="bx bxs-log-out-circle nav-icon"></i>Stock-out</Link></li>
            </ul>
          </li>
          <li>
            <div className="flex-gap">
              <i className="bx bxs-report nav-icon"></i>
              <Link to="/report">Report</Link>
            </div>
          </li>
        </ul>
        <footer className="sidebar-footer">
          <p> 2024 &copy; Dsupriatna </p>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
