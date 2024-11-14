import "./WarehouseItem.scss";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

import { Link } from "react-router-dom";

function WarehouseItem({ warehouse }) {
  const handleDeleteWarehouse = () => {
    console.log("Button clicked");
  };

  return (
    <div className="warehouse-item">
      <div className="item__row">
        <div className="item__info">
          <h4 className="item__label">Warehouse</h4>
          <div className="item__link-container">
            <Link to={`warehouse/${warehouse.id}`} className="item__link">
              <h3 className="item__data item__data--link">
                {warehouse.warehouse_name}
              </h3>
              <img
                className="item__chevron-icon"
                src={chevronIcon}
                alt="chevron-icon"
              />
            </Link>
          </div>
        </div>
        <div className="item__info item__info--address">
          <h4 className="item__label">Address</h4>
          <p className="item__data p2">
            {" "}
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </p>
        </div>
      </div>
      <div className="item__row item__row--desktop">
        <div className="item__info item__info--contact">
          <h4 className="item__label">Contact Name</h4>
          <p className="item__data p2">{warehouse.contact_name}</p>
        </div>

        <div className="item__info item__info--contact">
          <h4 className="item__label">Contact Information:</h4>
          <p className="item__data p2">{warehouse.contact_phone}</p>
          <p className="item__data p2">{warehouse.contact_email}</p>
        </div>
      </div>
      <div className="item__row item__row--actions">
        <div className="item__info item__info--delete">
          <img
            className="item__delete-icon"
            src={deleteIcon}
            onClick={handleDeleteWarehouse}
            alt="delete-icon"
          />
        </div>
        <div className="item__info item__info--edit">
          <Link
            className="item__edit-link"
            to={`/warehouse/edit/${warehouse.id}`}
          >
            <img className="item__edit-icon" src={editIcon} alt="edit icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WarehouseItem;
