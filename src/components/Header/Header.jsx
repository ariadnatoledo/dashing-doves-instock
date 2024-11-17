import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logoInStock from "../../assets/Logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("warehouses");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("warehouses")) {
      setActiveTab("warehouses");
    } else if (location.pathname.includes("inventory")) {
      setActiveTab("inventory");
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logoInStock} alt="In Stock Logo" className="header__sitelogo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-menu">
          <li className="header__nav-menu-item">

            <button
              className={`header__nav-menu-item-link ${activeTab === "warehouses" ? "header__nav-menu-item-link--active" : ""
                }`}
              onClick={() => handleTabClick("warehouses")}
            >
              Warehouses
            </button>
          </li>
          <li className="header__nav-menu-item">
            <button
              className={`header__nav-menu-item-link ${activeTab === "inventory" ? "header__nav-menu-item-link--active" : ""
                }`}
              onClick={() => handleTabClick("inventory")}
            >
              Inventory
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

