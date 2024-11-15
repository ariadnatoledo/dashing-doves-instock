import { Link } from "react-router-dom";
import React, { useState } from "react";
import logoInStock from "../../assets/Logo/InStock-Logo_1x.png";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const [activeTab, setActiveTab] = useState("warehouses");

  const navigate = useNavigate();

  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "warehouses") {
      navigate("/warehouses"); 
    } else if (tab === "inventory") {
      navigate("/inventory"); 
    }
  };

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
                  activeTab === "warehouses"
                    ? "header__nav-menu-item-link--active"
                    : ""
                }`}
                onClick={() => handleTabClick("warehouses")} // Corrected the onClick handler
              >
                Warehouses
              </button>
            </li>
            <li className="header__nav-menu-item">
              <button
                className={`header__nav-menu-item-link ${
                  activeTab === "inventory"
                    ? "header__nav-menu-item-link--active"
                    : ""
                }`}
                onClick={() => handleTabClick("inventory")} // Corrected the onClick handler
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
