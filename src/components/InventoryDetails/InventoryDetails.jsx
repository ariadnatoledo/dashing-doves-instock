import "./InventoryDetails.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import backIconImage from "../../assets/Icons/arrowback.svg";
import editWhite from "../../assets/Icons/edit-white-24px.svg";

function WarehouseDetails() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [inventory, setInventory] = useState({});

  const { inventoryId } = useParams();

  async function getInventoryById(id) {
    try {
      const response = await axios.get(`${baseURL}/inventories/${id}`);
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory data by ID", error);
    }
  }

  useEffect(() => {
    getInventoryById(inventoryId);
  }, [inventoryId]);

  return (
    <div className="inventory">
      <ComponentHeader
        backIcon={backIconImage}
        navigateTo="/inventory"
        text={inventory?.item_name || "Default Text"}
        editIcon={editWhite}
        editIconTablet={editWhite} navigateToEdit={`/inventory/${inventory.id}/edit`}
      />
      <section className="inventory__details">
        <div className="inventory__details--left">
          <article className="inventory-card">
            <h4 className="inventory-card__title">Item Description:</h4>
            <p className="inventory-card__text p2">{inventory.description}</p>
          </article>

          <article className="card">
            <h4 className="inventory-card__title">Category:</h4>
            <p className="inventory-card__text p2">{inventory.category}</p>
          </article>
        </div>

        <div className="inventory__details--right">
          <div className="inventory__status-info">
            <article className="inventory-card">
              <h4 className="inventory-card__title">Status:</h4>
              <p className={`inventory-card__instock ${inventory.status === "Out of Stock" ? "inventory-card__instock--false" : ""}`}>
                {inventory.status}
              </p>
            </article>

            <article className="inventory-card">
              <h4 className="inventory-card__title">Quantity:</h4>
              <p className="inventory-card__text p2">{inventory.quantity}</p>
            </article>
          </div>

          <article className="inventory-card">
            <h4 className="inventory-card__title">Warehouse:</h4>
            <p className="inventory-card__text p2">{inventory.warehouse_name}</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default WarehouseDetails;
