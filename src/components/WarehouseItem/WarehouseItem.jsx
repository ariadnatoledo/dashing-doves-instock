import "./WarehouseItem.scss";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

import { Link } from "react-router-dom";

function WarehouseItem({ warehouse, onDelete, isFirst }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const deleteWarehouse = () => {
    onDelete(warehouse.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <DeleteModal
        isModalOpen={isModalOpen}
        title={`Delete ${warehouse.warehouse_name} warehouse?`}
        content={`Please confirm that you'd like to delete the ${warehouse.warehouse_name} from the list of warehouses. You won't be able to undo this action.`}
        closeModal={closeDeleteModal}
        deleteItem={deleteWarehouse}
      ></DeleteModal>
     <div className={`warehouse-item ${isFirst ? 'warehouse-item-first' : ''}`}>
      <div className="item__row">
        <div className="item__info">
          <h4 className="item__label">Warehouse</h4>
          <div className="item__link-container">
            <Link to={`warehouses/${warehouse.id}`} className="item__link">
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
          <button className="item__info item__info--delete">
            <img
              className="item__delete-icon"
              src={deleteIcon}
              onClick={openDeleteModal}
              alt="delete-icon"
            />
          </button>
          <div className="item__info item__info--edit">
            <Link
              className="item__edit-link"
              to={`/warehouses/${warehouse.id}/edit`}
            >
              <img className="item__edit-icon" src={editIcon} alt="edit icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default WarehouseItem;
