import "./WarehouseItem.scss";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

import { Link } from "react-router-dom";

function WarehouseItem({ warehouse, onDelete }) {
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
      <div className="warehouse-item">
        <div className="warehouse-item__container-name">
          <h4 className="warehouse-item__label">Warehouse</h4>
          <Link
            to={`warehouses/${warehouse.id}`}
            className="warehouse-item__item-link"
          >
            <h3 className="warehouse-item__text--link-data">
              {warehouse.warehouse_name}
            </h3>
            <img
              className="warehouse-item__link-icon"
              src={chevronIcon}
              alt="chevron-icon"
            />
          </Link>
        </div>

        <div className="warehouse-item__container-address">
          <h4 className="warehouse-item__label">Address</h4>
          <p className="warehouse-item__text p2">
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </p>
        </div>

        <div className="warehouse-item__container-contact-name">
          <h4 className="warehouse-item__label">Contact Name</h4>
          <p className="warehouse-item__text p2">{warehouse.contact_name}</p>
        </div>

        <div className="warehouse-item__container-contact-info">
          <h4 className="warehouse-item__label">Contact Information:</h4>
          <p className="warehouse-item__text p2">{warehouse.contact_phone}</p>
          <p className="warehouse-item__text p2">{warehouse.contact_email}</p>
        </div>

        <div className="warehouse-item__container-buttons">
          <button className="warehouse-item__buttons-delete">
            <img
              className="warehouse-item__buttons-delete-icon"
              src={deleteIcon}
              onClick={openDeleteModal}
              alt="delete-icon"
            />
          </button>
          <button className="warehouse-item__buttons-edit">
            <Link
              className="warehouse-item__buttons-edit-link"
              to={`/warehouses/${warehouse.id}/edit`}
            >
              <img
                className="warehouse-item__buttons-edit-icon"
                src={editIcon}
                alt="edit icon"
              />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default WarehouseItem;
