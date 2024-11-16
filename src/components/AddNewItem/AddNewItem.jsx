import "./AddNewItem.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddNewItem() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const response = await axios.get(`${baseURL}/inventories`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory data", error);
    }
  }

  //   console.log(items);

  // const {category} = items;
  const uniqueCategories = [...new Set(items.map((item) => item.category))];
  const uniqueWarehouses = [
    ...new Set(items.map((item) => item.warehouse_name)),
  ];

  // console.log(category);
  console.log("These are my categories", uniqueCategories);
  console.log("These are my warehouses", uniqueWarehouses);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <form className="addNewItem-form">
      <ComponentHeader navigateTo="/inventory" text="Add New Item" />
      <section className="addNewItem">
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
          <select className="itemDetails-select" name="itemCategory">
          <option className="itemDetails-options" value="Select a category" disabled>
              Select a category
            </option>
            {uniqueCategories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="border"></div>
        <div className="itemAvailability">
          <h2 className="itemAvailability-title"> Item Availability </h2>

          <label className="itemAvailability-label">Status</label>

          <div className="itemAvailability__status">
            <label htmlFor="stock" className="itemAvailability__radio-label">
              <input
                type="radio"
                className="itemAvailability__radio"
                name="stock"
              />
              In stock
            </label>

            <label htmlFor="stock" className="itemAvailability__radio-label">
              <input
                type="radio"
                className="itemAvailability__radio"
                name="stock"
              />
              Out of stock
            </label>
          </div>

          <label className="itemAvailability-label">Quantity</label>
          <textarea
            className="itemAvailability-input"
            name="itemQuantity"
            placeholder="0"
            required
          ></textarea>

          <label className="itemAvailability-label">Warehouse</label>
          <select className="itemAvailability-select" name="itemWarehouse">
          <option className="itemAvailability-options" value="Select a warehouse" disabled>
              Select a warehouse
            </option>
            {uniqueWarehouses.map((warehouse) => (
              <option value={warehouse}>{warehouse}</option>
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
