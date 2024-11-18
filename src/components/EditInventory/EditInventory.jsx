import "./EditInventory.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import { useState, useEffect } from "react";
import axios from "axios";
import iconErrorState from "../../assets/Icons/error-24px.svg";
import { useParams, useNavigate } from "react-router-dom";
function EditInventory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;
  const [inventory, setInventory] = useState({});
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueWarehouses, setUniqueWarehouses] = useState([]);
  const [status, setStatus] = useState("");
  const [showQuantity, setShowQuantity] = useState(false);
  const [errors, setErrors] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    itemStatus: "",
    itemQuantity: "",
    itemWarehouse: "",
  });
  useEffect(() => {
    const fetchInventoryAndOptions = async () => {
      try {
        const inventoryResponse = await axios.get(
          `${baseURL}/inventories/${id}`
        );
        setInventory(inventoryResponse.data);
        setStatus(inventoryResponse.data.status);
        const inventoriesResponse = await axios.get(`${baseURL}/inventories`);
        const inventories = inventoriesResponse.data;
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
  }, [id]);
  useEffect(() => {
    if (status === "In Stock") {
      setShowQuantity(true);
    } else {
      setShowQuantity(false);
    }
  }, [status]);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const itemName = e.target.itemName.value;
    const itemDescription = e.target.itemDescription.value;
    const itemCategory = e.target.itemCategory.value;
    const itemStatus = e.target.itemStatus.value;
    let itemQuantity = 0;
    if (status === "In Stock") {
      itemQuantity = parseInt(e.target.itemQuantity.value, 10);
    }
    const formErrors = {};
    if (!itemName) formErrors.itemName = "Item Name is required.";
    if (!itemDescription)
      formErrors.itemDescription = "Description is required.";
    if (!itemCategory) formErrors.itemCategory = "Category is required.";
    if (!itemStatus) formErrors.itemStatus = "Status is required.";
    if (itemStatus === "In Stock" && (!itemQuantity || itemQuantity <= 0)) {
      formErrors.itemQuantity = "Quantity must be greater than 0.";
    }
    if (!e.target.itemWarehouse.value)
      formErrors.itemWarehouse = "Warehouse is required.";
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const updatedInventory = {
      id: inventory.id,
      warehouse_id: inventory.warehouse_id,
      warehouse_name: e.target.itemWarehouse.value,
      item_name: itemName,
      description: itemDescription,
      category: itemCategory,
      status: itemStatus,
      quantity: itemQuantity,
    };
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
      alert("Failed to save inventory.");
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
            className={`itemDetails-input ${
              errors.itemName ? "error-input" : ""
            }`}
            name="itemName"
            defaultValue={inventory.item_name}
            placeholder="Item Name"
            onFocus={() =>
              setErrors((prevErrors) => ({ ...prevErrors, itemName: "" }))
            }
          />
          {errors.itemName && (
            <p className="error-message">
              <img src={iconErrorState} alt="Error" className="error-icon" />
              {errors.itemName}
            </p>
          )}
          <label className="itemDetails-label">Description</label>
          <textarea
            className={`itemDetails-input itemDetails-input--description ${
              errors.itemDescription ? "error-input" : ""
            }`}
            name="itemDescription"
            defaultValue={inventory.description}
            placeholder="Please enter a brief item description..."
            onFocus={() =>
              setErrors((prevErrors) => ({ ...prevErrors, itemDescription: "" }))
            }
          />
          {errors.itemDescription && (
            <p className="error-message">
              <img src={iconErrorState} alt="Error" className="error-icon" />
              {errors.itemDescription}
            </p>
          )}
          <label className="itemDetails-label">Category</label>
          <select
            className={`itemDetails-select ${
              errors.itemCategory ? "error-border" : ""
            }`}
            name="itemCategory"
            value={inventory.category || ""}
            onChange={(e) =>
              setInventory((prev) => ({ ...prev, category: e.target.value }))
            }
            onFocus={() =>
              setErrors((prevErrors) => ({ ...prevErrors, itemCategory: "" }))
            }
          >
            <option value="" disabled>
              Select a category
            </option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.itemCategory && (
            <p className="error-message">
              <img src={iconErrorState} alt="Error" className="error-icon" />
              {errors.itemCategory}
            </p>
          )}
        </div>
        <div className="border"></div>
        <div className="itemAvailability">
          <h2 className="itemAvailability-title">Item Availability</h2>
          <label className="itemAvailability-label">Status</label>
          <div className="itemAvailability__status">
            <label
              htmlFor="in-stock"
              className={`itemAvailability__radio-label ${
                showQuantity ? "itemAvailability__radio-label--clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="itemStatus"
                value="In Stock"
                checked={status === "In Stock"}
                onChange={handleStatusChange}
              />
              In Stock
            </label>
            <label
              htmlFor="out-of-stock"
              className={`itemAvailability__radio-label ${
                !showQuantity ? "itemAvailability__radio-label--clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="itemStatus"
                value="Out of Stock"
                checked={status === "Out of Stock"}
                onChange={handleStatusChange}
              />
              Out of Stock
            </label>
          </div>
          {errors.itemStatus && (
            <p className="error-message">
              <img src={iconErrorState} alt="Error" className="error-icon" />
              {errors.itemStatus}
            </p>
          )}
          {showQuantity && (
            <div className="quantity-div">
              <label className="itemAvailability-label">Quantity</label>
              <textarea
                className={`itemAvailability-input ${
                  errors.itemQuantity ? "error-input" : ""
                }`}
                type="number"
                name="itemQuantity"
                placeholder="0"
                defaultValue={inventory.quantity}
                onFocus={() =>
                  setErrors((prevErrors) => ({ ...prevErrors, itemQuantity: "" }))
                }
              />
              {errors.itemQuantity && (
                <p className="error-message">
                  <img
                    src={iconErrorState}
                    alt="Error"
                    className="error-icon"
                  />
                  {errors.itemQuantity}
                </p>
              )}
            </div>
          )}
          <label className="itemAvailability-label">Warehouse</label>
          <select
  className={`itemDetails-select ${
    errors.itemWarehouse ? "error-border" : ""
  }`}
  name="itemWarehouse"
  value={inventory.warehouse_name || ""}
  onChange={(e) =>
    setInventory((prevInventory) => ({
      ...prevInventory,
      warehouse_name: e.target.value,
    }))
  }
  onFocus={() =>
    setErrors((prevErrors) => ({ ...prevErrors, itemWarehouse: "" }))
  }
>
  <option value="" disabled>
    Select a warehouse
  </option>
  {uniqueWarehouses.map((warehouse) => (
    <option key={warehouse} value={warehouse}>
      {warehouse}
    </option>
  ))}
</select>
          {errors.itemWarehouse && (
            <p className="error-message">
              <img src={iconErrorState} alt="Error" className="error-icon" />
              {errors.itemWarehouse}
            </p>
          )}
        </div>
      </section>
      <SaveCancelAddButton
        showAddWarehouse={false}
        showSave={true}
        navigateTo={`/inventory`}
      />
    </form>
  );
}
export default EditInventory;
