import { useNavigate } from "react-router-dom"; 
import "./PagesHeader.scss";


function PagesHeader({ title, display }) {
  const navigate = useNavigate(); 

  const handleAddNewClick = () => {
    if (title === "warehouses") {
      navigate("/warehouses/add-new"); 
    } else if (title === "items") {
      navigate("/items/add-new");
    } else {
      console.warn("Unsupported title for Add New action");
    }
  };
  return (
    <div className={`pages-header ${display === false ? "pages-header--off" : ""}`}>
      <h2 className="pages-header__title">{ title }</h2>
      <div className="pages-header__search-and-add">
        <div className="pages-header__search">
          <input
            type="text"
            className="pages-header__search-input"
            placeholder="Search..."
          />
          <button className="pages-header__search-button">
            <img
              src="src/assets/Icons/search-24px.svg"
              alt="Search icon"
              className="pages-header__search-button-icon"
            />
          </button>
        </div>
        <button className="pages-header__button" onClick={handleAddNewClick}>
          + Add New {title === "warehouses" ? "Warehouse" : "Item"}
        </button>
      </div>
    </div>
  );
}

export default PagesHeader;
