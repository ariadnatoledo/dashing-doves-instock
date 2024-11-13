import React from "react";
import "./PagesHeader.scss";

function DisplayHeader() {
  return (
    <div className="header">
      <h2 className="header__title">Warehouses</h2>
      <div className="header__search-and-add">
        <div className="header__search">
          <input
            type="text"
            className="header__search-input"
            placeholder="Search..."
          />
          <button className="header__search-button">
            <img
              src="src/assets/Icons/search-24px.svg"
              alt="Search icon"
              className="header__search-button-icon"
            />
          </button>
        </div>
          <button className="header__button">+ Add New Warehouse</button>
      </div>
      
    </div>
  );
}

export default DisplayHeader;
