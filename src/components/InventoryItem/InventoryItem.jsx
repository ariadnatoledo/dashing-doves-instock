import "./InventoryItem.scss";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import { useState, useEffect } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

import { Link } from "react-router-dom";

function InventoryItem({ inventory, isFirst, isForWarehouseDetails, onDelete }) {

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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
  <>
  <DeleteModal
        isModalOpen={isModalOpen}
        title={`Delete ${inventory.item_name} inventory item?`}
        content={`Please confirm that you'd like to delete the ${inventory.item_name} from the list of warehouses. You won't be able to undo this action.`}
        closeModal={closeDeleteModal}
        deleteItem={deleteInventory}
      ></DeleteModal>
    <div className="inventory">
      <div className={`top-border ${isFirst ? "first-top-border" : ""}`}></div>
      <div className="inventory-item">
        {isMobile ? (
          <>
            <div className="inventory-item__info">
              <div className="inventory-item__left">
                <div className="inventory-item__container-item">
                  <h4 className="inventory-item__label">INVENORY ITEM</h4>
                  <Link
                    to={`/inventory/${inventory.id}`}
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
                  <p className="inventory-item__category">
                    {inventory.category}
                  </p>
                </div>
              </div>
              <div className="inventory-item__right">
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

                <div className="inventory-item__container-quantity">
                  <h4 className="inventory-item__label">QTY</h4>
                  <p className="inventory-item__quantity">
                    {inventory.quantity}
                  </p>
                </div>

                <div
                  className={`inventory-item__container-warehouse ${
                    isForWarehouseDetails
                      ? "inventory-item__container-warehouse--off"
                      : ""
                  }`}
                >
                  <h4 className="inventory-item__label">WAREHOUSE</h4>
                  <p className="inventory-item__warehouse">
                    {inventory.warehouse_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="inventory-item__buttons">
              <button className="inventory-item__buttons-delete">
                <Link
                  className="inventory-item__buttons-delete-link"
                  to={`/inventory/${inventory.id}/delete`}
                >
                  <img
                    className="inventory-item__buttons-delete-icon"
                    src={deleteIcon}
                    onClick={openDeleteModal}
                    alt="delete-icon"
                  />
                </Link>
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
          </>
        ) : (
          <>
            <div className="inventory-item__container-item">
              <Link
                to={`/inventory/${inventory.id}`}
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
              <p className="inventory-item__category">{inventory.category}</p>
            </div>

            <div className="inventory-item__container-status">
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

            <div className="inventory-item__container-quantity">
              <p className="inventory-item__quantity">{inventory.quantity}</p>
            </div>

            <div
              className={`inventory-item__container-warehouse ${
                isForWarehouseDetails
                  ? "inventory-item__container-warehouse--off"
                  : ""
              }`}
            >
              <h4 className="inventory-item__label">WAREHOUSE</h4>
              <p className="inventory-item__warehouse">
                {inventory.warehouse_name}
              </p>
            </div>
            <div className="inventory-item__buttons">
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
          </>
        )}
      </div>
    </div>
    </>
      
    
  );
}

export default InventoryItem;
