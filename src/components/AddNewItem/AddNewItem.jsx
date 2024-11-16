import "./AddNewItem.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import SaveCancelAddButton from "../SaveCancelAddButton/SaveCancelAddButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddNewItem() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

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
    //   console.log(response.data);
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
        // navigate("/");
      }
    } catch (error) {
      console.error("There was an error posting your item", error);
    }
  }

  //   console.log(items);

  // const {category} = items;
  const uniqueCategories = [...new Set(items.map((item) => item.category))];
  const uniqueWarehouses = [
    ...new Set(items.map((item) => item.warehouse_name)),
  ];

  // console.log(category);
//   console.log("These are my categories", uniqueCategories);
//   console.log("These are my warehouses", uniqueWarehouses);


  function handleFormSubmit(event) {
    event.preventDefault();


    const itemName = event.target.itemName.value;
    const itemDescription = event.target.itemDescription.value;
    const itemCategory = event.target.itemCategory.value;
    const itemStatus = event.target.itemStatus.value;
    const itemQuantity = event.target.itemQuantity.value;
    const itemWarehouse = event.target.itemWarehouse.value;
    const itemWarehouseId = "";

    if(isNaN(itemQuantity)) {
        alert("Please ensure quantity is a numeric value");
    } 



    // console.log(warehouses);

    for (let i of warehouses) {
        if (itemWarehouse === i.name) {
            const itemWarehouseId = i.id
            console.log(itemWarehouseId);
            return itemWarehouseId;
        }
    }

    // console.log(itemName);
    // console.log(itemDescription);
    // console.log(itemCategory);
    // console.log(itemStatus);
    // console.log(itemQuantity);
    // console.log(itemWarehouse);
    console.log(itemWarehouseId);


    // if (!title && !description) {
    //   alert("Fields must be filled before proceeding.");
    //   return;
    // } else if (!title) {
    //   alert("Please be sure to include a video title!");

    //   return;
    // } else if (!description) {
    //   alert("Please be sure to include a video description!");
    //   return;
    // } else {
    //   const newItem = {
    //     warehouse_id: 1,
    //     item_name: itemName,
    //     description: itemDetails,
    //     category: itemCategory,
    //     status: itemStatus,
    //     quantity: itemQuantity
    //   };

    //   addItem(newItem);
    // }
  }

  useEffect(() => {
    getItems();
    getWarehouses();
  }, []);

  return (
    <form className="addNewItem-form" onSubmit={handleFormSubmit}>
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
          <select className="itemDetails-select" name="itemCategory" required>
          <option className="itemDetails-options" value="Select a category" disabled>
              Select a category
            </option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="border"></div>
        <div className="itemAvailability">
          <h2 className="itemAvailability-title"> Item Availability </h2>

          <label className="itemAvailability-label">Status</label>

          <div className="itemAvailability__status">
            <label htmlFor="itemStatus" className="itemAvailability__radio-label">
              <input
                type="radio"
                className="itemAvailability__radio"
                name="itemStatus"
                value="In Stock" required
              />
              In stock
            </label>

            <label htmlFor="itemStatus" className="itemAvailability__radio-label">
              <input
                type="radio"
                className="itemAvailability__radio"
                name="itemStatus"
                value="Out of stock" required
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
          <select className="itemAvailability-select" name="itemWarehouse" required>
          <option className="itemAvailability-options" value="Select a warehouse" disabled>
              Select a warehouse
            </option>
            {uniqueWarehouses.map((warehouse) => (
              <option key={warehouse} value={warehouse}>{warehouse}</option>
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
