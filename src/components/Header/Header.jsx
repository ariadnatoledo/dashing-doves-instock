import { Link } from "react-router-dom";
import React, { useState } from "react";
import logoInStock from "../../assets/Logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  const [activeTab, setActiveTab] = useState("warehouses");

  return (
    <div>
      <header className="header">
        <Link to="/">
          <img
            src={logoInStock}
            alt="In Stock Logo"
            className="header__sitelogo"
          />
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-menu">
            <li className="header__nav-menu-item">
              <button
                className={`header__nav-menu-item-link ${
                  activeTab === "warehouses" ? "header__nav-menu-item-link--active" : ""
                }`}
                onClick={() => setActiveTab("warehouses")}
              >
                Warehouses
              </button>
            </li>
            <li className="header__nav-menu-item">
              <button
                className={`header__nav-menu-item-link ${
                  activeTab === "inventory" ? "header__nav-menu-item-link--active" : ""
                }`}
                onClick={() => setActiveTab("inventory")}
              >
                Inventory
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;