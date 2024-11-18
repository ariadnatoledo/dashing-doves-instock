import "./InventoryItem.scss";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

import { Link } from "react-router-dom";

function InventoryItem({
  inventory,
  isFirst,
  isForWarehouseDetails,
  onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const deleteInventory = () => {
    onDelete(inventory.id);
    setIsModalOpen(false);
  };

  return (
    <div>
      <DeleteModal
        isModalOpen={isModalOpen}
        title={`Delete ${inventory.item_name} inventory item?`}
        content={`Please confirm that you'd like to delete the ${inventory.item_name} from the list of warehouses. You won't be able to undo this action.`}
        closeModal={closeDeleteModal}
        deleteItem={deleteInventory}
      ></DeleteModal>
      <div className="inventory">
        <div
          className={`top-border ${isFirst ? "first-top-border" : ""}`}
        ></div>

        <div className="inventory-item">
          <div className="inventory-item__container-inventory">
            <h4 className="inventory-item__label">INVENORY ITEM</h4>
            <Link
              to={`/inventory/${inventory.id}`}
              className="inventory-item__item-link"
            >
              <h3 className="inventory-item__text--link-data">
                {inventory.item_name}
              </h3>
              <img
                className="inventory-item__link-icon"
                src={chevronIcon}
                alt="chevron-icon"
              />
            </Link>
          </div>

          <div className="inventory-item__container-category">
            <h4 className="inventory-item__label">CATEGORY</h4>
            <p className="inventory-item__text p2">{inventory.category}</p>
          </div>

          <div className="inventory-item__container-status">
            <h4 className="inventory-item__label">STATUS</h4>
            <p
              className={`inventory-item__instock ${
                inventory.status === "Out of Stock"
                  ? "inventory-item__instock--false"
                  : ""
              }`}
            >
              {inventory.status}
            </p>
          </div>

          <div className="inventory-item__container-placeholder">
          </div>

          <div className="inventory-item__container-quantity">
            <h4 className="inventory-item__label">QTY</h4>
            <p className="inventory-item__text p2">{inventory.quantity}</p>
          </div>

          <div
            className={`inventory-item__container-warehouse ${
              isForWarehouseDetails
                ? "inventory-item__container-warehouse--off"
                : ""
            }`}
          >
              <h4 className="inventory-item__label">WAREHOUSE</h4>
              <p className="inventory-item__text p2">
                {inventory.warehouse_name}
              </p>
          </div>

          <div className="inventory-item__container-buttons">
            <button className="inventory-item__buttons-delete">
              <img
                className="inventory-item__buttons-delete-icon"
                src={deleteIcon}
                onClick={openDeleteModal}
                alt="delete-icon"
              />
            </button>

            <button className="inventory-item__buttons-edit">
              <Link
                className="inventory-item__buttons-edit-link"
                to={`/inventory/${inventory.id}/edit`}
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
    </div>
  );
}

export default InventoryItem;
