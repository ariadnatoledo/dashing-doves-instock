import "./InventoryItem.scss";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

import { Link } from "react-router-dom";

function InventoryItem({ inventory, isFirst }) {
  const handleDeleteInventoryItem = () => {
    console.log("Button clicked");
  };

  return (
    <div className="inventory">
    <div className={`top-border ${isFirst ? 'first-top-border' : ''}`}></div>
    <div className="inventory-item">
      <div className="inventory-item__info">
        <div className="inventory-item__left">
          <div className="inventory-item__container-item">
            <h4 className="inventory-item__label">INVENORY ITEM</h4>
            <Link
              to={`inventory/${inventory.id}`}
              className="inventory-item__item-link"
            >
              <h3 className="inventory-item__item-link-data">
                {inventory.item_name}
              </h3>
              <img
                className="inventory-item__item-link-icon"
                src={chevronIcon}
                alt="chevron-icon"
              />
            </Link>
          </div>
          <div className="inventory-item__container-category">
            <h4 className="inventory-item__label">CATEGORY</h4>
            <p className="inventory-item__category">{inventory.category}</p>
          </div>
        </div>
        <div className="inventory-item__right">
          <div className="inventory-item__container-status">
            <h4 className="inventory-item__label">STATUS</h4>
            <p className="inventory-item__instock">{inventory.status}</p>
          </div>

          <div className="inventory-item__container-quantity">
            <h4 className="inventory-item__label">QTY</h4>
            <p className="inventory-item__quantity">{inventory.quantity}</p>
          </div>

          <div className="inventory-item__container-warehouse">
            <h4 className="inventory-item__label">WAREHOUSE</h4>
            <p className="inventory-item__warehouse">
              {inventory.warehouse_name}
            </p>
          </div>
        </div>
      </div>

      <div className="inventory-item__buttons">
        <button className="inventory-item__buttons-delete">
          <img
            className="inventory-item__buttons-delete-icon"
            src={deleteIcon}
            onClick={handleDeleteInventoryItem}
            alt="delete-icon"
          />
        </button>

        <button className="inventory-item__buttons-edit">
          <Link
            className="inventory-item__buttons-edit-link"
            to={`/inventory/edit/${inventory.id}`}
          >
            <img
              className="inventory-item__buttons-edit-icon"
              src={editIcon}
              alt="edit icon"
            />
          </Link>
        </button>
      </div>
    </div>
    </div>
  );
}

export default InventoryItem;
