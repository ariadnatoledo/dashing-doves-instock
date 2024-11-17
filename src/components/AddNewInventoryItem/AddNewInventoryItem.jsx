import "./AddNewInventoryItem.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iconErrorState from "../../assets/Icons/error-24px.svg";
import axios from "axios";

function AddNewItem() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showQuantity, setShowQuantity] = useState(null);
  const [selectedValue, setSelectedValue] = useState({
    itemCategory: "",
    itemWarehouse: "",
  });

  const [errors, setErrors] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    itemStatus: "",
    itemQuantity: "",
    itemWarehouse: "",
  });

  const navigate = useNavigate();

  async function getItems() {
    try {
      const response = await axios.get(`${baseURL}/inventories`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory data", error);
    }
  }

  async function getWarehouses() {
    try {
      const response = await axios.get(`${baseURL}/warehouses`);
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching inventory data", error);
    }
  }

  async function addItem(item) {
    try {
      const response = await axios.post(`${baseURL}/inventories`, item);
      if (response) {
        alert(
          "Thank you for your addition!.\n You will now be re-directed to your new Item page"
        );
        const newItemId = response.data.item;
        navigate(`/inventory/${newItemId}`);
      }
    } catch (error) {
      console.error("There was an error posting your item", error);
    }
  }

  const uniqueCategories = [...new Set(items.map((item) => item.category))];
  const uniqueWarehouses = [
    ...new Set(items.map((item) => item.warehouse_name)),
  ];

  const handleSelect = (event) => {
    const { name, value } = event.target;
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadio = (event) => {
    if (event.target.value === "Out of Stock") {
      setShowQuantity(false);
    } else if (event.target.value === "In Stock") {
      setShowQuantity(true);
    }
  };

  const handleQuantity = (event) => {
    if (event.target.value === "0") {
      alert("You've set your item In Stock, but with a quantity of 0.");
    }
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    const itemName = event.target.itemName.value;
    const itemDescription = event.target.itemDescription.value;
    const itemCategory = event.target.itemCategory.value;
    const itemStatus = event.target.itemStatus.value;
    const itemQuantity = showQuantity
      ? parseInt(event.target.itemQuantity.value, 10)
      : 0; 
    const itemWarehouse = event.target.itemWarehouse.value;
    let itemWarehouseId = "";

    const formErrors = {};

    if (!itemName) formErrors.itemName = "Item Name is required.";
    if (!itemDescription)
      formErrors.itemDescription = "Description is required.";
    if (!itemCategory) formErrors.itemCategory = "Category is required.";
    if (!itemStatus) formErrors.itemStatus = "Status is required.";

    if (itemStatus === "In Stock" && (!itemQuantity || itemQuantity <= 0)) {
      formErrors.itemQuantity =
        "Quantity must be a valid number greater than 0.";
    }

    if (!itemWarehouse) formErrors.itemWarehouse = "Warehouse is required.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    for (let i of warehouses) {
      if (itemWarehouse === i.warehouse_name) {
        itemWarehouseId = i.id;
        break;
      }
    }

    const newItem = {
      warehouse_id: itemWarehouseId,
      item_name: itemName,
      description: itemDescription,
      category: itemCategory,
      status: itemStatus,
      quantity: itemQuantity,
    };

    addItem(newItem);
  }

  useEffect(() => {
    getItems();
    getWarehouses();
  }, []);

  return (
    <form className="addNewItem-form" onSubmit={handleFormSubmit}>
      <ComponentHeader navigateTo="/inventory" text="Add New Inventory Item" />
      <section className="addNewItem-section">
        <div className="itemDetails">
          <h2 className="itemDetails-title">Item Details</h2>

          <label className="itemDetails-label">Item Name</label>
          <textarea
            className={`itemDetails-input ${
              errors.itemName ? "error-input" : ""
            }`}
            name="itemName"
            placeholder="Item Name"
            onFocus={() => setErrors((prev) => ({ ...prev, itemName: "" }))}
          ></textarea>
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
            placeholder="Please enter a brief item description..."
            onFocus={() =>
              setErrors((prev) => ({ ...prev, itemDescription: "" }))
            } 
          ></textarea>
          {errors.itemDescription && (
            <p className="error-message">
              <img src={iconErrorState} alt="Error" className="error-icon" />
              {errors.itemDescription}
            </p>
          )}

<label className="itemDetails-label">Category</label>
<select
  className={`itemDetails-select ${errors.itemCategory ? 'error-border' : ''}`} 
  name="itemCategory"
  value={selectedValue.itemCategory}
  onChange={(e) => {
    handleSelect(e);
    if (e.target.value !== "") {
      setErrors((prev) => ({ ...prev, itemCategory: "" })); 
    }
  }}
  onFocus={() => setErrors((prev) => ({ ...prev, itemCategory: "" }))} 
>
  <option className="itemDetails-options" value="" disabled>
    Please select
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
              htmlFor="itemStatus"
              className="itemAvailability__radio-label"
            >
              <input
                type="radio"
                className="itemAvailability__radio"
                name="itemStatus"
                value="In Stock"
                onChange={handleRadio}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, itemStatus: "" }))
                } 
              />
              In stock
            </label>

            <label
              htmlFor="itemStatus"
              className="itemAvailability__radio-label"
            >
              <input
                type="radio"
                className="itemAvailability__radio"
                name="itemStatus"
                value="Out of Stock"
                onChange={handleRadio}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, itemStatus: "" }))
                } 
              />
              Out of stock
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
                name="itemQuantity"
                placeholder="0"
                onChange={handleQuantity}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, itemQuantity: "" }))
                } 
              ></textarea>
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
            className={`itemAvailability-select ${
              errors.itemWarehouse ? "error-border" : ""
            }`} 
            name="itemWarehouse"
            value={selectedValue.itemWarehouse}
            onChange={handleSelect}
            onFocus={() =>
              setErrors((prev) => ({ ...prev, itemWarehouse: "" }))
            } 
          >
            <option className="itemAvailability-options" value="" disabled>
              Please select
            </option>
            {uniqueWarehouses.map((warehouse) => (
              <option className="itemDetails-options" key={warehouse} value={warehouse}>
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
        showAddItem={true}
        navigateTo={`/inventory`}
      />
    </form>
  );
}

export default AddNewItem;
