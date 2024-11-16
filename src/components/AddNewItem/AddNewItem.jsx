import "./AddNewItem.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNewItem() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showQuantity, setShowQuantity] = useState(true);
  const [selectedValue, setSelectedValue] = useState({
    itemCategory: "",
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
    if (event.target.value === "Out of stock") {
      setShowQuantity(false);
    } else if (event.target.value === "In stock") {
      setShowQuantity(true);
    }
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    const itemName = event.target.itemName.value;
    const itemDescription = event.target.itemDescription.value;
    const itemCategory = event.target.itemCategory.value;
    const itemStatus = event.target.itemStatus.value;
    const itemQuantity = parseInt(event.target.itemQuantity.value, 10);
    const itemWarehouse = event.target.itemWarehouse.value;
    let itemWarehouseId = "";

    if (isNaN(itemQuantity)) {
      alert("Please ensure quantity is a numeric value");
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
            className="itemDetails-input"
            name="itemName"
            placeholder="Item Name"
            required
          ></textarea>

          <label className="itemDetails-label"> Description </label>
          <textarea
            className="itemDetails-input itemDetails-input--description"
            name="itemDescription"
            placeholder="Please enter a brief item description..."
            required
          ></textarea>

          <label className="itemDetails-label">Category</label>
          <select
            className="itemDetails-select"
            name="itemCategory"
            value={selectedValue.itemCategory}
            onChange={handleSelect}
            required
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
        </div>
        <div className="border"></div>
        <div className="itemAvailability">
          <h2 className="itemAvailability-title"> Item Availability </h2>

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
                value="In stock"
                required
                onChange={handleRadio}
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
                value="Out of stock"
                required
                onChange={handleRadio}
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
                required
              ></textarea>
            </div>
          )}

          <label className="itemAvailability-label">Warehouse</label>
          <select
            className="itemAvailability-select"
            name="itemWarehouse"
            value={selectedValue.itemWarehouse}
            onChange={handleSelect}
            required
          >
            <option className="itemAvailability-options" value="" disabled>
              Please select
            </option>
            {uniqueWarehouses.map((warehouse) => (
              <option key={warehouse} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
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
