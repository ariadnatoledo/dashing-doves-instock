import "./EditInventory.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditInventory() {
  const { inventoryId } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;
  const [status, setStatus] = useState("");
  const [inventory, setInventory] = useState({});
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueWarehouses, setUniqueWarehouses] = useState([]);
  const [showQuantity, setShowQuantity] = useState(false);

  useEffect(() => {
    const fetchInventoryAndOptions = async () => {
      try {
        const inventoryResponse = await axios.get(
          `${baseURL}/inventories/${inventoryId}`
        );
        setInventory(inventoryResponse.data);

        const inventoriesResponse = await axios.get(`${baseURL}/inventories`);
        const inventories = inventoriesResponse.data;

        if (inventoryResponse.data.quantity > 0) {
          setStatus("In Stock");
          setShowQuantity(true);
        } else {
          setStatus("Out of Stock");
          setShowQuantity(false);
        }

        const categories = [
          ...new Set(inventories.map((item) => item.category)),
        ];
        const warehouses = [
          ...new Set(inventories.map((item) => item.warehouse_name)),
        ];

        setUniqueCategories(categories);
        setUniqueWarehouses(warehouses);
      } catch (error) {
        console.error("Failed to fetch inventory or options data", error);
      }
    };

    fetchInventoryAndOptions();
  }, [inventoryId]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);

    if (status === "Out of Stock") {
      setShowQuantity(true);
    } else if (status === "In Stock") {
      setShowQuantity(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let itemQuantity;

    if (!inventory) return;
    console.log(inventory.warehouse_id);

    if (status === "In Stock") {
      itemQuantity = parseInt(e.target.itemQuantity.value, 10);
    } else {
      itemQuantity = 0;
    }

    const updatedInventory = {
      id: inventory.id,
      warehouse_id: inventory.warehouse_id,
      warehouse_name: e.target.itemWarehouse.value,
      item_name: e.target.itemName.value,
      description: e.target.itemDescription.value,
      category: e.target.itemCategory.value,
      status: e.target.stock.value,
      quantity: itemQuantity,
    };

    if (
      !updatedInventory.warehouse_name ||
      !updatedInventory.item_name ||
      !updatedInventory.description ||
      !updatedInventory.category ||
      !updatedInventory.status ||
      (isNaN(updatedInventory.quantity) && !updatedInventory.quantity >= 0)
    ) {
      alert("All fields are required.");
      return;
    }

    if (updatedInventory.quantity <= 0 && status === "In Stock") {
      alert("Quantity must be more than 0 if saying In Stock")
      return
    }

    saveInventory(updatedInventory);
  };

  const saveInventory = async (updatedInventory) => {
    try {
      const response = await axios.put(
        `${baseURL}/inventories/${updatedInventory.id}`,
        updatedInventory
      );
      if (response.status === 200) {
        alert("Inventory updated successfully!");
        navigate(`/warehouses/${updatedInventory.warehouse_id}`);
      }
    } catch (error) {
      console.error("Failed to save inventory changes", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Failed to save inventory"}`
        );
      }
    }
  };

  if (!inventory) {
    return <p>Loading inventory data...</p>;
  }
  return (
    <form className="editInventory-form" onSubmit={handleSubmit}>
      <ComponentHeader navigateTo="/inventory" text="Edit Inventory Item" />

      <section className="editInventory">
        <div className="itemDetails">
          <h2 className="itemDetails-title">Item Details</h2>

          <label className="itemDetails-label">Item Name</label>
          <textarea
            className="itemDetails-input"
            name="itemName"
            placeholder="Item Name"
            defaultValue={inventory.item_name}
            required
          ></textarea>

          <label className="itemDetails-label">Description</label>
          <textarea
            className="itemDetails-input itemDetails-input--description"
            name="itemDescription"
            placeholder="Please enter a brief item description..."
            defaultValue={inventory.description}
            required
          ></textarea>

          <label className="itemDetails-label">Category</label>
          <select
            className="itemDetails-select"
            name="itemCategory"
            defaultValue={inventory.category}
            required
          >
            <option className="itemDetails-options" value="" disabled>
              Select a category
            </option>
            {uniqueCategories.map((category) => (
              <option
                className="itemDetails-options"
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="border"></div>

        <div className="itemAvailability">
          <h2 className="itemAvailability-title">Item Availability</h2>

          <label className="itemAvailability-label" htmlFor="in-stock">
            Status
          </label>
          <div className="itemAvailability__status">
            <label
              className={`itemAvailability__radio-label ${
                status === "In Stock"
                  ? "itemAvailability__radio-label--clicked"
                  : ""
              }`}
            >
              <input
                type="radio"
                className="itemAvailability__radio"
                name="stock"
                id="in-stock"
                value="In Stock"
                checked={status === "In Stock"}
                onChange={handleStatusChange}
              />
              In stock
            </label>
            <label
              className={`itemAvailability__radio-label ${
                status === "Out of Stock"
                  ? "itemAvailability__radio-label--clicked"
                  : ""
              }`}
              htmlFor="out-of-stock"
            >
              <input
                type="radio"
                className="itemAvailability__radio"
                name="stock"
                id="out-of-stock"
                value="Out of Stock"
                checked={status === "Out of Stock"}
                onChange={handleStatusChange}
              />
              Out of stock
            </label>
          </div>
          {showQuantity && (
            <div className="quantity-div">
              <label className="itemAvailability-label">Quantity</label>
              <textarea
                className="itemAvailability-input"
                name="itemQuantity"
                placeholder="0"
                defaultValue={inventory.quantity}
                required
              ></textarea>
            </div>
          )}

          <label className="itemAvailability-label">Warehouse</label>
          <select
            className="itemAvailability-select"
            name="itemWarehouse"
            defaultValue={inventory.warehouse_name}
            required
          >
            <option className="itemDetails-options" value="" disabled>
              Select a warehouse
            </option>
            {uniqueWarehouses.map((warehouse) => (
              <option
                className="itemDetails-options"
                key={warehouse}
                value={warehouse}
              >
                {warehouse}
              </option>
            ))}
          </select>
        </div>
      </section>

      <SaveCancelAddButton showSave={true} navigateTo="/inventory" />
    </form>
  );
}

export default EditInventory;
